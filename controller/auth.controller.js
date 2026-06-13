const userModal = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// this api register the user in database

async function registerController(req, res) {
  const { username, email, password, bio, profilePic } = req.body; // this gets details from user

  const isUserExist = await userModal.findOne({
    $or: [{ username }, { email }],
  }); // this checks if the user already exist or not 

  if (isUserExist) {
    return res.status(409).json({
      message:
        isUserExist.email == email && isUserExist.username == username
          ? "User exist"
          : isUserExist.email == email
            ? "email already exist"
            : "username already exist",
    });
  } // this send response if user or email already exist

  const hashedPass = await bcrypt.hash(password, 10); // this hashed the password

  const user = await userModal.create({
    username,
    email,
    password: hashedPass,
    bio,
    profilePic,
  }); // create a user of the details

  const token = jwt.sign(
    {
      id: user._id,
      username:user.username
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1d" },
  ); // create a token for user 

  res.cookie("token", token); //save it in cookies

  res.status(200).json({
    message: "user created succesfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      token: token,
    },
  }); // send the user details in response
}

// this api login the existing user

async function loginController(req, res) {

  const { username, email, password } = req.body; // get info from user 

  const user = await userModal.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  }); // check if the user which the user tries to login reall exist or not

  if (!user) {
    res.status(409).json("user not found");
  } // if the user he tries to login is not exist then tis response is send
 
  const isPasswordValid = await bcrypt.compare(password, user.password); // it returns true or false by comparing the passowrd

  if (!isPasswordValid) {
    res.status(409).json("Invalid password");
  } // response if password is invalid
  
  else {
    const token = jwt.sign(
      {
        id: user._id,
        username:user.username
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);
    res.status(200).json({
      message: "logged in",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        token: token,
      },
    });
  } // if password matches then user is given jwt token and send user details in response
}

module.exports = {
  registerController: registerController,
  loginController: loginController,
};
