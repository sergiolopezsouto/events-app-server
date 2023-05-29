const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

const { getAllEvents, getOneEvent, saveEvent } = require("../controllers/event.controller")



router.get("/getAllEvents" , getAllEvents )

router.get("/getOneEvent/:event_id", getOneEvent)

router.post("/saveEvent", isAuthenticated, saveEvent)


module.exports = router