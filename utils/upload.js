require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


module.exports = function(image) {
    return new Promise((resolve, reject) => {
      return cloudinary.uploader.upload(image, (err, url) => {
        if (err) return reject(err)
        return resolve(url)
      })
    })
}