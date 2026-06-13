const mongoose = require("mongoose")

const followerSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    followee:{
        type:String
        
    }
},{
    timestamps:true
}

)

followerSchema.index({follower:1,followee:1},{unique:true})

const followModal = mongoose.model("Follow",followerSchema)


module.exports = followModal