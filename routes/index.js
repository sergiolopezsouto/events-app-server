const router = require("express").Router()

router.use("/events" , require('./event.routes'))

module.exports = router