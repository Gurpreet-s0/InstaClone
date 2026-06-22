const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postId",
        require:[true]
    },
    username:{
        type:String,
        ref:"username",
        require:[true]
    }
},
{
    timestamps:true
})

likeSchema.index({postId:1,username:1},{unique:true})

const likeModal = mongoose.model("Likes",likeSchema )


module.exports = likeModal