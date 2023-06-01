const Event = require('./../models/Event.model')
const User = require('./../models/User.model')


const getAllEvents = (req, res, next) => {

  Event
    .find()
    .sort({date: 1 , time: 1})
    // .select()
    .then(response => res.json(response))
    .catch(err => next(err))
    
}

const getOneEvent = (req, res, next) => {
  const { event_id } = req.params;

  Event.findById(event_id)
    .populate('assistants creator')
    .populate({ path: 'comments.user', model: 'User' })
    .then(response => res.json(response))
    .catch(err => next(err));
};



const saveEvent = (req, res, next) => {

  const { name, description, date, time, imageUrl, assistants, location } = req.body
  const { _id: creator} = req.payload

  Event
    .create({ name, description, date, time, imageUrl, assistants, location, creator })
    .then(response => res.json(response))
    .catch(err => next(err))

}


const updateEvent = (req, res, next) => {

  const { _id, name, description, date, time, imageUrl, assistants, location } = req.body

  Event
    .findByIdAndUpdate(_id, { name, description, date, time, imageUrl, assistants, location }, { new: true })
    .populate('assistants creator')
    .populate({ path: 'comments.user', model: 'User' })
    .then(response => res.json(response))
    .catch(err => next(err))

}

const deleteEvent = (req, res, next) => {

  const { event_id } = req.params

  console.log(event_id)

  Event
    .findByIdAndDelete(event_id)
    .then(response => res.json(response))
    .catch(err => next(err))
}


const assistEvent = (req, res, next) => {

  const { _id: user_id } = req.payload
  const { event_id } = req.body 

  Event 
    .findByIdAndUpdate(event_id, { $addToSet: { assistants: user_id } } , {new: true})
    .populate('assistants creator')
    .populate({ path: 'comments.user', model: 'User' })
    .then(response => res.json(response))
    .catch(err => next(err))

}


const notAssistEvent = (req, res, next) => {

  const {_id: user_id} = req.payload
  const { event_id } = req.body 

  Event 
    .findByIdAndUpdate(event_id, { $pull: { assistants: user_id } } , {new: true})
    .populate('assistants creator')
    .populate({ path: 'comments.user', model: 'User' })
    .then(response => res.json(response))
    .catch(err => next(err))

}


const addComment = (req, res, next) => {
  const { event_id } = req.params;
  const { comment } = req.body;

  const newComment = {
    user: req.payload._id,
    message: comment
  };

  Event
    .findByIdAndUpdate(event_id, { $push: { comments: newComment } }, { new: true })
    .populate('assistants creator')
    .populate({ path: 'comments.user', model: 'User' })
    .then(response => res.json(response))
    .catch(err => next(err));
}



module.exports = { getAllEvents , getOneEvent, saveEvent, updateEvent, deleteEvent, assistEvent, notAssistEvent, addComment }