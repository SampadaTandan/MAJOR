const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
const register = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("Received body:", req.body);
    const { username, email, phone, password } = req.body;

    // Check if all required fields are present
    if (!username || !phone) {
      return res
        .status(400)
        .json({ message: "Username and phone are required" });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the user
    const userCreated = await User.create({ username, email, phone, password });

    // Respond with success
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// *-------------------------------
//* User Login Logic 📝
// *-------------------------------
const login = async (req, res, next) => {
  try {
    console.log("Received body:", req.body);
    const { email, password } = req.body;

    // Check if user exists
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
