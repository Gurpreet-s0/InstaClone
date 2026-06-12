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

 const userId = req.user.id

  const post = await postModal.create({
    captions: req.body.captions,
    postPic: file.url,
    userId: userId,
  });
  res.status(201).json({
    message: "Post created",
    post: post,
  });
}

async function getPostController(req, res) {
  
  const userId = req.user.id;

  const posts = await postModal.find({
    userId: userId,
  });

  res.status(200).json({
    message: "Posts of the users are here ",
    posts: posts,
  });
}


async function getPostDetailsController(req,res){
  
  const userId = req.user.id
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
