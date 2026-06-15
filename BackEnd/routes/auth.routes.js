const express = require("express");

const authControllers = require("../controller/auth.controller");

const authRouter = express.Router();

const userMiddleware = require("../Middlewares/auth.middleware")

authRouter.post("/register",authControllers.registerController);

authRouter.post("/login",  authControllers.loginController);

authRouter.get("/get-me",userMiddleware,authControllers.getMeController)

module.exports = authRouter;
