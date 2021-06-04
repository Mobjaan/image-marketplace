const User = require('../models/User')
const router = require('express').Router()
const { body, validationResult } = require('express-validator') 



router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', 
[ 
    body('email').isEmail().withMessage('Provide a valid email address').custom(async (value, {req}) => {
        const user = await User.findOne({
            email: value,
        })

        req.user_queried = user

        return !!user
    }).withMessage('It seems there isn\'t any user with the email.'), 
    body('password').notEmpty().withMessage('Provide a password').custom((value, {req}) => {
        return req.user_queried && req.user_queried.comparePassword(value, (error, match) => {
            return !!match
        })
    }).withMessage('Password is wrong')
], async (req, res) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) { 
        return res.render('login.ejs', { errors: errors.errors }) 
    }

    req.session.current_user = req.user_queried // stores user in session
    req.session.save() // saves the session
    return res.redirect('/') // redirects to homepage
})

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', 
[ 
    body('name').notEmpty().withMessage('Name is mandatory'), 
    body('email').isEmail().withMessage('Provide a valid email'), 
    body('password').notEmpty().withMessage('Provide a password').custom((value, {req}) => {
        return value == req.body.c_password;
    }).withMessage('Passwords must match!') 
]
, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        return res.render('register.ejs', { errors: errors.errors })
    }

    const user = await User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).save() 

    req.session.current_user = user 
    req.session.save() 
    return res.redirect('/')
})
  
router.get('/logout', (req, res) => { // get request to "/auth/logout"
    req.session.destroy() // destroys the session
    return res.redirect('/') // redirects to homepage
})

module.exports = router