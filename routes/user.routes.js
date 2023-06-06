const router = require("express").Router()

const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { getUserById, followUser, unfollowUser, updateProfile, getAllUsers } = require("../controllers/user.controller")


router.get("/getAllUsers", isAuthenticated, getAllUsers)
router.get("/:id", isAuthenticated, getUserById)
router.put("/followUser/:userFollowed_id", isAuthenticated, followUser)
router.put("/unfollowUser/:userFollowed_id", isAuthenticated, unfollowUser)
router.put("/updateProfile", isAuthenticated, updateProfile)


module.exports = router