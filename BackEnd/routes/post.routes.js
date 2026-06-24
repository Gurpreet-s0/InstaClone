const { PostController, getPostDetailsController, likeController, unLikeController } = require("../controller/post.controller");
const { getPostController , getFeedPostsController } = require("../controller/post.controller");
const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const usermiddleware = require("../Middlewares/auth.middleware")


postRouter.post("/create-post", upload.single("image"),usermiddleware, PostController);

postRouter.get("/getData",usermiddleware, getPostController);

postRouter.get("/feed", usermiddleware,getFeedPostsController)

postRouter.get("/:postId",usermiddleware,getPostDetailsController)

postRouter.post("/like/:postId",usermiddleware,likeController)

postRouter.post("/unlike/:postId",usermiddleware,unLikeController)
module.exports = postRouter;
