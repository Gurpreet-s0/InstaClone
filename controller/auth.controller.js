const userModal = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profilePic } = req.body;

  const isUserExist = await userModal.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.status(409).json({
      message:
        isUserExist.email == email && isUserExist.username == username
          ? "User exist"
          : isUserExist.email == email
            ? "email already exist"
            : "username already exist",
    });
  }
  const hashedPass = await bcrypt.hash(password, 10);

  const user = await userModal.create({
    username,
    email,
    password: hashedPass,
    bio,
    profilePic,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user created succesfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      token: token,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModal.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    res.status(409).json("user not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(409).json("Invalid password");
  } else {
    const token = jwt.sign(
      {
        id: user._id,
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
  }
}

module.exports = {
  registerController: registerController,
  loginController: loginController,
};
