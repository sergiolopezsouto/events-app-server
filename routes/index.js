const router = require("express").Router()

router.use("/events" , require('./event.routes'))
router.use("/auth" , require('./auth.routes'))

module.exports = router