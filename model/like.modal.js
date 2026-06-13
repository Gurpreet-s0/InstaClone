const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postId",
        require:[true]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userId",
        require:[true]
    }
},
{
    timestamps:true
})

likeSchema.index({postId:1,userId:1},{unique:true})

const likeModal = mongoose.model("Likes",likeSchema )


module.exports = likeModal