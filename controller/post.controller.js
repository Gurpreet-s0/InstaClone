const postModal = require("../model/post.modal");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function PostController(req, res) {
  const file = await imagekit.files.upload({
    file: await ImageKit.toFile(req.file.buffer, "file"),
    fileName: req.file.originalname,
  });

  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Token must be required");
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized token",
      error: err,
    });
  }

  const post = await postModal.create({
    captions: req.body.captions,
    postPic: file.url,
    userId: decoded.id,
  });
  res.status(201).json({
    message: "Post created",
    post: post,
  });
}

module.exports = {
  PostController: PostController,
};
