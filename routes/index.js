const router = require("express").Router()

router.use("/auth" , require('./auth.routes'))
router.use("/" , require('./user.routes'))
router.use("/events" , require('./event.routes'))
router.use("/users" , require('./user.routes'))

const uploadRoutes = require('./upload.routes')
router.use("/upload" , uploadRoutes)

module.exports = router