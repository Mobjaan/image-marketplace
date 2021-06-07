const Image = require('../models/Image')
const router = require('express').Router()
const Category = require('../models/Category')
const { body, validationResult } = require('express-validator') 


router.get('/view', async (req, res) => {
    res.render('view_categories.ejs', { categories: await Category.find().populate('parent') })
})

router.get('/add', (req, res) => {
    res.render('category_form.ejs')
})

router.post('/add', 
[ 
    body('title').notEmpty().withMessage('Title is mandatory'), 
    body('parent').optional().custom(async value => {
        return value != 'None' && !!await Category.findById(value)
    }).withMessage('Please choose a valid category parent')
]
, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        return res.render('category_form.ejs', { errors: errors.errors })
    }

    
    await Category({
        title: req.body.title,
        parent: req.body.parent != 'None' ? req.body.parent : undefined
    }).save()

    return res.redirect('/categories/view')
})

router.get('/update/:id', async (req, res) => {
    res.render('category_form.ejs', {category: await Category.findById(req.params.id)})
})

router.post('/update', 
[ 
    body('title').notEmpty().withMessage('Title is mandatory'), 
    body('parent').optional().custom(async value => {
        return value != 'None' && !!await Category.findById(value)
    }).withMessage('Please choose a valid category parent'),
    body('category').custom(async value => {
        return !!await Category.findById(value)
    }).withMessage('Something is seriously wrong. Please try again later.')
]
, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        return res.render('category_form.ejs', { errors: errors.errors })
    }

    
    const { title, parent } = req.body

    await Category.findByIdAndUpdate(req.body.category, { title, parent }, { returnOriginal: false })

    return res.redirect('/categories/view')
})


router.get('/delete/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    await Category.updateMany({ parent: req.params.id }, { $unset: { parent: "" } })
    await Image.updateMany({ categories: req.params.id }, { $pullAll: { categories: [req.params.id] } })
    return res.redirect('/categories/view')
})


module.exports = router