const router = require("express").Router()

router.use("/events" , require('./event.routes'))
router.use("/auth" , require('./auth.routes'))

const uploadRoutes = require('./upload.routes')
router.use("/upload" , uploadRoutes)

module.exports = router