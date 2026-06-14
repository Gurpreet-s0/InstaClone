const followModal = require("../model/follower.modal");
const userModal = require("../model/user.model");
async function followerController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  // This checks if user is following itself

  if (followerUsername == followeeUsername) {
    return res.status(400).json("you cannot follow yourself");
  }

  // This checks the user tries to follow really exist or not

  const isFolloweeExist = await userModal.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "The user you wants to follow is not exist",
    });
  }

  // This checks if user have already followed the user that he wants to follow

  const isFollowEachOtherExist = await followModal.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isFollowEachOtherExist) {
    return res.status(400).json({
      message: `you have already followed ${followeeUsername}`,
      isFollowEachOtherExist,
    });
  }

  // This creates the user follower details if the above verifications satisies

  const followerDetails = await followModal.create({
    follower: followerUsername,
    followee: followeeUsername
  });
  res.status(201).json({
    message: `${followerUsername} follows ${followeeUsername}`,
    followerDetails,
  });
}


async function unFollowController(req,res){

    const followerUsername = req.user.username
    const unFolloweeUsername = req.params.username
    
    if(followerUsername == unFolloweeUsername){
        return res.status(400).json({
            message:"you cannot unfollow yourself"
        })
    }

    const isUserFollowTheFollowee = await followModal.findOne({
        follower:followerUsername,
        followee:unFolloweeUsername
    })

    if(!isUserFollowTheFollowee){
        return res.status(400).json({
            messge:`the ${followerUsername} do not follow ${unFolloweeUsername}`
        })
    }

     await followModal.findByIdAndDelete(isUserFollowTheFollowee._id)

     res.status(200).json({
        message:`${followerUsername} unfollowed ${unFolloweeUsername}`
     })
}


async function followRequestController(req, res) {
  const { status, username: follower } = req.params;
  const followee = req.user.username;

  const request = await followModal.findOne({
    follower,
    followee,
    request: "pending",
  });

  if (!request) {
    return res.status(400).json({
      message: "There is no request from that user",
    });
  }

  if (status === "accept") {
    await followModal.updateOne(
      { _id: request._id },
      { request: "accepted" }
    );

    return res.status(200).json({
      message: `You have accepted the request from ${follower}`,
    });
  }

  if (status === "reject") {
    await followModal.updateOne(
      { _id: request._id },
      { request: "rejected" }
    );

    return res.status(200).json({
      message: `You have rejected the request from ${follower}`,
    });
  }

  return res.status(400).json({
    message: "Invalid status",
  });
}


module.exports = {
  followerController: followerController,
  unFollowController:unFollowController,
  followRequestController:followRequestController
};
