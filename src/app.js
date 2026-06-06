
const express = require("express")

const app = express()
require("dotenv").config()
app.use(express.json())
const postRouter = require("../routes/post.routes")

const authRouter = require("../routes/auth.routes")
const cookieParser = require("cookie-parser")

app.use("/api/auth", authRouter)
app.use("/api/post",postRouter)
app.use(cookieParser())
module.exports = app