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
      message: "Unauthorized Access",
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


async function getPostDetailsController(req,res){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json("token must be required")
  }

  let decoded 

  try{
    decoded = jwt.verify(token,process.env.JWT_TOKEN)

  }
  catch(err){
    return res.status(401).json({
      message:"unauthorized Access",
      error:err.message
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  let postDetails
try{
  postDetails = await postModal.findById(postId)

}
 catch(err){
if(!postDetails){
    return res.status(404).json({
      message:"post details are not available",
      error:err.message
    })
  }
 }
  
  const isValidUser = postDetails.userId.toString() === userId.toString()

  if(!isValidUser){
    return res.status(403).json({
      message:"Forbidden access"
    })
  }
  return res.status(200).json({
    message:"post details fetched successfully",
    postDetails:postDetails
  })
}
module.exports = {
  PostController: PostController,
  getPostController: getPostController,
  getPostDetailsController:getPostDetailsController
};
