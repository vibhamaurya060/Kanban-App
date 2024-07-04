const { Router } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklistModel");
require('dotenv').config();

const userRouter = Router();

// Register route
userRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Validate body
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Invalid request body, check your fields" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ message: "Email is already registered, try to login" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new userModel({ email, username, password: hashedPassword });
    await newUser.save();
    
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validate body
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid request body, check your fields" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered, try to register" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Sign JWT
    const token = jwt.sign(
      { email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Adjust token expiry as needed
    );

    return res.status(200).json({ accessToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Logout route
userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token is not provided" });
  }

  try {
    // Store token in blacklist
    const newToken = new blacklistModel({ token });
    await newToken.save();
    
    return res.status(201).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
