const Event = require('./../models/Event.model')
const User = require('./../models/User.model')


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
    .populate('assistants')
    .populate('creator')
    .then(response => res.json(response))
    .catch(err => next(err))

}


const saveEvent = (req, res, next) => {

  const { name, description, date, imageUrl, assistants, location } = req.body
  const { _id: creator} = req.payload

  Event
    .create({ name, description, date, imageUrl, assistants, location, creator })
    .then(response => res.json(response))
    .catch(err => next(err))

}


const updateEvent = (req, res, next) => {

  // console.log( 'a cliente me llega ------' , req.body)

  const { _id, name, description, date, imageUrl, assistants, location } = req.body

  Event
    .findByIdAndUpdate(_id, { name, description, date, imageUrl, assistants, location }, { new: true })
    .populate('assistants')
    .populate('creator')
    .then(response => res.json(response))
    .catch(err => next(err))

}


const assistEvent = (req, res, next) => {

  const { _id: user_id } = req.payload
  const { event_id } = req.body 

  Event 
    .findByIdAndUpdate(event_id, { $addToSet: { assistants: user_id } } , {new: true})
    .populate('assistants')
    .populate('creator')
    .then(response => res.json(response))
    .catch(err => next(err))

}


const notAssistEvent = (req, res, next) => {

  const {_id: user_id} = req.payload
  const { event_id } = req.body 

  Event 
    .findByIdAndUpdate(event_id, { $pull: { assistants: user_id } } , {new: true})
    .populate('assistants')
    .populate('creator')
    .then(response => res.json(response))
    .catch(err => next(err))

}




module.exports = { getAllEvents , getOneEvent, saveEvent, updateEvent, assistEvent, notAssistEvent }