const User = require('../models/User.model')
const Event = require('./../models/Event.model')


const getUserById = (req, res, next) => {

  const {id} = req.params

  User
    .findById(id)
    .populate('following')
    .then(user => res.json(user))
    .catch(err => next(err))

}


const followUser = (req, res, next) => {

  const { _id: userLogged_id } = req.payload
  const { userFollowed_id } = req.params 

  User 
    .findByIdAndUpdate(userLogged_id, { $addToSet: { following: userFollowed_id } } , {new: true})
    .populate('following')
    .then(response => res.json(response))
    .catch(err => next(err))

}


const unfollowUser = (req, res, next) => {

  const { _id: userLogged_id } = req.payload
  const { userFollowed_id } = req.params 

  User 
    .findByIdAndUpdate(userLogged_id, { $pull: { following: userFollowed_id } } , {new: true})
    .populate('following')
    .then(response => res.json(response))
    .catch(err => next(err))

}



module.exports = { getUserById, followUser, unfollowUser }