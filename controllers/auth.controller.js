const User = require('../models/User.model')


const signup = (req, res, next) => {
  
  const { email, password, username, profileImg } = req.body

    User
      .create({ email, password, username, profileImg })
      .then( () => res.sendStatus(201))
      .catch(err => next(err))

}

// ----------------------------------------------------------------------------------------------------------

const login = (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Provide email and password."] });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {

        if (!foundUser) {
            res.status(401).json({ errorMessages: ["User not found."] })
            return
        }

        if (foundUser.validatePassword(password)) {
            const authToken = foundUser.signToken()
            res.json({ authToken: authToken })
        }
        else {
            res.status(401).json({ errorMessages: ["Unable to authenticate the user."] });
        }

        })
        .catch(err => next(err));

}

// ----------------------------------------------------------------------------------------------------------

const verify = (req, res, next) => {

    res.status(200).json(req.payload)
    
}



module.exports = {signup, login, verify}