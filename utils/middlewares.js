module.exports = {
    authenticatedMiddleware: function(req, res, next) {
        if (req.session.current_user) {
            next()
        } else {
            res.redirect('/') 
        }
    }
}