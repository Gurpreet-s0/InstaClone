const { PostController, getPostDetailsController } = require("../controller/post.controller");
const { getPostController } = require("../controller/post.controller");
const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const usermiddleware = require("../Middlewares/auth.middleware")


postRouter.post("/", upload.single("image"),usermiddleware, PostController);

postRouter.get("/",usermiddleware, getPostController);

postRouter.get("/:postId",usermiddleware,getPostDetailsController)

module.exports = postRouter;
