const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, rollNo, email, password, role, department } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ rollNo });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, rollNo, email, password, role, department });
    await newUser.save();

    // Send back only safe data, NOT password or entire object
    res.status(201).json({
      message: "Signup successful",
      user: {
        name: newUser.name,
        rollNo: newUser.rollNo,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { rollNo, password, role } = req.body;

    const user = await User.findOne({ rollNo, role });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token with user id and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send back minimal user info + token (never send password)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        rollNo: user.rollNo,
        email: user.email,
        role: user.role,
        department: user.department,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
