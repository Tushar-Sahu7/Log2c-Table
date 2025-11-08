const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    //Check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already existed" });
    }

    //Hash password
    const hassPassword = await bcrypt.hash(password, 10);

    //create user instance
    const user = new User({ name, dob, email, password: hassPassword });
    await user.save();

    //generate jwt
    const token = jwt.sign(
      {
        id: User._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      sucess: true,
      token,
      user: { id: user._id, name: user.name, dob: user.dob, email: user.email },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exist in db or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //generate jwt token
    const token = jwt.sign(
      {
        id: User._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //send response
    res.status(200).json({
      sucess: true,
      token,
      user: { id: user._id, name: user.name, dob: user.dob, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};