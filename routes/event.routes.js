const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { getAllEvents, getOneEvent, saveEvent, updateEvent, assistEvent, notAssistEvent } = require("../controllers/event.controller")


router.get("/getAllEvents" , getAllEvents )
router.get("/getOneEvent/:event_id", getOneEvent)
router.post("/saveEvent", isAuthenticated, saveEvent)
router.put("/updateEvent",isAuthenticated, updateEvent)
router.put("/assistEvent", isAuthenticated, assistEvent)
router.put("/notAssistEvent", isAuthenticated, notAssistEvent)


module.exports = router