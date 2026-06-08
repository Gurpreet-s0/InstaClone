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

async function getPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Token must be required");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    res.status(401).json({
      message: "Token invalid or token not provided",
      error: err,
    });
  }

  const userId = decoded.id;

  const posts = await postModal.find({
    userId: userId,
  });

  res.status(200).json({
    message: "Posts of the users are here ",
    posts: posts,
  });
}

module.exports = {
  PostController: PostController,
  getPostController: getPostController,
};
