const app = require("./src/app")
const { config } = require("dotenv")
const connectToDb = require("./Database/database")
require("dotenv").config
connectToDb()


app.listen(3000, ()=>{
    console.log("server is running .... ")
})