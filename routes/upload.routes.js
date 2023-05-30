const router = require("express").Router()

// const uploader = require('./../middleware/cloudinary.middleware')
const uploader = require('./../middlewares/uploader.middleware')

router.post('/image', uploader.single('imageData'), (req, res) => {

  if (!req.file) {
    res.status(500).json({ errorMessage: 'Error uploading the file' })
    return
  }

  res.json({ cloudinary_url: req.file.path })
  
})


module.exports = router
