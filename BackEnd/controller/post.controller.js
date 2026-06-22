const postModal = require("../model/post.modal");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModal = require("../model/like.modal");


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
}); // it a make a variable in which my imagekit account is linked

// this api creates post 
 
async function PostController(req, res) {
  const file = await imagekit.files.upload({
    file: await ImageKit.toFile(req.file.buffer, "file"),
    fileName: req.file.originalname,
  }); 

 const userId = req.user.id

  const post = await postModal.create({
    captions: req.body.captions,
    postPic: file.url,
    user: userId,
  });
  res.status(201).json({
    message: "Post created",
    post: post,
  });
}

async function getPostController(req, res) {
  
  const userId = req.user.id;

  const posts = await postModal.find({
    user: userId,

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
  
  const isValidUser = postDetails.user.toString() === userId.toString()

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

async function likeController(req,res){
  const username = req.user.username
  const postId = req.params.postId

  const isPostExist = await postModal.findOne({
    _id:postId
  })

  if(!isPostExist){
    return res.status(400).json({
      message:"post does not exist"
    })
  }

  const isUserAlreadyLiked = await likeModal.findOne({
    username: username,
    postId:postId
  })

  if(isUserAlreadyLiked){
    return res.status(400).json({
      message:"you have already liked that post"
    })
  }

  const like = await likeModal.create({
    username:username,
    postId:postId
  })

  res.status(200).json({
    message:"You have liked the post ",
    like
  })
}

async function getFeedPostsController(req,res){
  const username = req.user.username
  const posts = await Promise.all((await postModal.find().populate("user").lean())
  .map(async (post)=>{

    const isLiked = await likeModal.findOne({
      username:username,
      postId:post._id
    })
    post.isliked = Boolean(isLiked)
    return post
  }))

  res.status(200).json({
    message:"Post fetched successfully",
    posts
  })
}

module.exports = {
  PostController: PostController,
  getPostController: getPostController,
  getPostDetailsController:getPostDetailsController,
  likeController:likeController,
  getFeedPostsController:getFeedPostsController
};
