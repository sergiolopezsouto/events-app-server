const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

const Event = require('./../models/Event.model')


router.get("/getAllEvents", (req, res, next) => {

  Event
    .find()
    // .sort({date: 1})
    .then(response => setTimeout( () => res.json(response), 1500))
    .catch(err => next(err))
})


router.get("/getOneEvent/:event_id", (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveEvent", isAuthenticated, (req, res, next) => {

  const { name, description, date, imageUrl, location } = req.body
  const { _id: creator} = req.payload

  Event
    .create({ name, description, date, imageUrl, location, creator })
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router