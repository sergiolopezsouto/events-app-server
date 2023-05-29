const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

const User = require('./../models/User.model')



// ----------------------------------------------------------------------------------------------------------


router.post('/signup', (req, res, next) => {

  const { email, password, username } = req.body

    User
      .create({ email, password, username })
      .then( () => res.sendStatus(201))
      .catch(err => next(err))
})


// ----------------------------------------------------------------------------------------------------------


router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }

      if (foundUser.validatePassword(password)) {
        const authToken = foundUser.signToken()
        res.json({ authToken: authToken })
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user." });
      }

    })
    .catch(err => next(err));
})


// ----------------------------------------------------------------------------------------------------------


router.get('/verify', isAuthenticated, (req, res, next) => {

    res.status(200).json(req.payload)
    
})


module.exports = router