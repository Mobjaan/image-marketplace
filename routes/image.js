const got = require('got')
const Image = require('../models/Image')
const router = require('express').Router()
const Category = require('../models/Category')
const imageUplaoder = require('../utils/upload')
const { body, validationResult } = require('express-validator') 
const { authenticatedMiddleware } = require('../utils/middlewares')


router.get('/get/:id', async (req, res) => {
    try {
        let image = await Image.findById(req.params.id)
        return got.stream(image.upload_path).pipe(res)
    } catch(error) {
        return  res.status(404)
    }
})


router.use(authenticatedMiddleware)

router.get('/all', async (req, res) => {
    return res.render('image_showcase.ejs', { images: await Image.find() })
})


router.get('/add', (req, res) => {
    return res.render('image_form.ejs')
})

router.post('/add', 
[
    body('title').notEmpty().withMessage('Title is mandatory'), 
    body('price').notEmpty().isNumeric().withMessage('Price is mandatory'), 
    body('description').notEmpty().withMessage('Description is mandatory'), 
    body('categories').custom((value, {req}) => {
        let ids = value.split(',') 
        let should_raise_error = true
        ids.forEach(async id => {
            let category = await Category.findById(id)
            if (!!category) should_raise_error = false
            else should_raise_error = true
        });

        return should_raise_error
    }).withMessage('Please choose a valid categories')
],
async (req, res) => {
    const errors = validationResult(req)

    if (!req.files.image) {

        let error = {
            "msg": "Select an Image",
            "param": "image"
        }

        if (!errors.isEmpty()) {
            errors.errors.push(error)
        } else  {
            errors = {
                errors: [].push(error),
                isEmpty: () => false
            }
        }

    }

    if (!errors.isEmpty()) {         
        return res.render('image_form.ejs', { errors: errors.errors })
    }
  
    const upload_result = await imageUplaoder(req.files.image.tempFilePath)
    console.log(upload_result)

    
    await Image({
        title: req.body.title,
        price: req.body.price,
        categories: req.body.categories.split(','),
        description: req.body.description,
        seller: req.session.current_user._id,
        upload_path: upload_result.secure_url
    }).save()

    return res.redirect('/images/view')
})


router.get('/view', async (req, res) => {
    return res.render('view_images.ejs', { images: await Image.find({ seller: req.session.current_user._id }).populate('categories') })
})

router.get('/delete/:id', async (req, res) => {
    await Image.findByIdAndDelete(req.params.id)
    return res.redirect('/images/view')
})



module.exports = router