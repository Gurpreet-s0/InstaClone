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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:[true,"user id is required for making a post"]
    }
})

const postModal = mongoose.model("posts",postSchema)

module.exports = postModal