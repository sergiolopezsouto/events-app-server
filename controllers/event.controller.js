const Event = require('./../models/Event.model')


const getAllEvents = (req, res, next) => {

  Event
    .find()
    // .sort({date: 1})
    .then(response => setTimeout( () => res.json(response), 1500))
    .catch(err => next(err))
    
}

const getOneEvent = (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(response => res.json(response))
    .catch(err => next(err))

}


const saveEvent = (req, res, next) => {

  const { name, description, date, imageUrl, location } = req.body
  const { _id: creator} = req.payload

  Event
    .create({ name, description, date, imageUrl, location, creator })
    .then(response => res.json(response))
    .catch(err => next(err))

}




module.exports = { getAllEvents , getOneEvent, saveEvent}