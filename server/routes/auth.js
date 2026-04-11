/*import express from "express";
import User from "../models/user.js";

const router = express.Router();

/// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const user = new User({ email, password, role });
  await user.save();

  res.json({ message: "User created" });
});

/// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      email: user.email,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router; */
import express from "express";
import User from "../models/User.js";

const router = express.Router();


// ✅ REGISTER (SIGNUP)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //email validation
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return 
      res.status(400).json({message:"invalid email format"});
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = new User({ name, email, password, phone });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login success",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;