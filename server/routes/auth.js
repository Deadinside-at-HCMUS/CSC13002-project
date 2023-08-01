const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
    });

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(403)
        .send({ message: "User with given email already exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
      ...req.body,
      password: hashPassword,
    }).save();

    newUser.password = undefined;
    newUser._v = undefined;

    res
      .status(200)
      .send({ data: newUser, message: "Account created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).send({ message: "invalid email or password!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Invalid email or password!" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Signing in please wait..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;
