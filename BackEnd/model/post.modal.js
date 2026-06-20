const mongoose  = require("mongoose")

const postSchema = new mongoose.Schema({
    captions : {
        type:String,
        default:""
    },
    postPic:{
        type:String,
        require:[true,"Post Image is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User Details",
        require:[true,"user id is required for making a post"]
    }
})

const postModal = mongoose.model("posts",postSchema)

module.exports = postModal