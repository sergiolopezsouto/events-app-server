const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { getAllEvents, getOneEvent, saveEvent, updateEvent, deleteEvent, assistEvent, notAssistEvent, addComment } = require("../controllers/event.controller")


router.get("/getAllEvents" , getAllEvents )
router.get("/getOneEvent/:event_id", getOneEvent)
router.post("/saveEvent", isAuthenticated, saveEvent)
router.put("/updateEvent",isAuthenticated, updateEvent)
router.delete("/deleteEvent/:event_id",isAuthenticated, deleteEvent)
router.put("/assistEvent", isAuthenticated, assistEvent)
router.put("/notAssistEvent", isAuthenticated, notAssistEvent)
router.post("/:event_id/comments", isAuthenticated, addComment)


module.exports = router