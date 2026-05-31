
const express = require("express")

const app = express()
require("dotenv").config()
app.use(express.json())

const authRouter = require("../routes/auth.routes")
const cookieParser = require("cookie-parser")
app.use("/api/auth", authRouter)
app.use(cookieParser())
module.exports = app