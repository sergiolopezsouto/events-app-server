const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { getUserById, followUser, unfollowUser } = require("../controllers/user.controller")


router.get("/:id", isAuthenticated, getUserById)
router.put("/followUser/:userFollowed_id", isAuthenticated, followUser)
router.put("/unfollowUser/:userFollowed_id", isAuthenticated, unfollowUser)


module.exports = router