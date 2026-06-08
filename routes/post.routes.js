const { PostController, getPostDetailsController } = require("../controller/post.controller");
const { getPostController } = require("../controller/post.controller");

const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), PostController);

postRouter.get("/", getPostController);

postRouter.get("/:postId",getPostDetailsController)

module.exports = postRouter;
