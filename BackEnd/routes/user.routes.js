const express = require("express")

const userRouter = express.Router()
const userMiddleware = require("../Middlewares/auth.middleware")
const followerController = require("../controller/follower.controller")
const unFollowController = require("../controller/follower.controller")
const followRequestController = require("../controller/follower.controller")

userRouter.post("/follow/:username", userMiddleware, followerController.followerController )

userRouter.post("/unfollow/:username", userMiddleware,unFollowController.unFollowController)

userRouter.post("/follow/request/:username/:status",userMiddleware,followRequestController.followRequestController)

module.exports = userRouter