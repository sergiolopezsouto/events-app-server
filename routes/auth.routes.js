const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { signup, login, verify } = require("../controllers/auth.controller")


router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', isAuthenticated, verify)


module.exports = router