const mongoose = require("mongoose")

const connectToDb = async  ()=>{
     mongoose.connect(process.env.MONGOOSE_URI)
     .then(()=>{
        console.log("connected to db")

     })
     .catch(()=>{
      console.log("not connectd to db")
     })

}

module.exports = connectToDb