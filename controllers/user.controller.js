const User = require('../models/User.model')
const Event = require('./../models/Event.model')


const getUserById = (req, res, next) => {

    const {id} = req.params

    User.findById(id)
    .populate('following')
    .then( user => res.json(user))
    .catch(err => next(err))

}



module.exports = { getUserById }