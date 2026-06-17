import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();
// Get total users
router.get("/users-count",async(req,res)=>{
  try{
    const count=await User.countDocuments();
    res.json({totalUsers:count});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

//  REGISTER (SIGNUP)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //email validation
    const emailExists=await User.findOne({email});
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message:"invalid email format"});
    }
    if(emailExists){
      return res.status(400).json({
        msg:"Email already exists"
      });
    }
    const nameExists=await User.findOne({name});
    if(nameExists){
      return res.status(400).json({
        msg:"user already exist"
      });
    }
    const phoneExists=await User.findOne({phone});
    if(phoneExists){
      return res.status(400).json({
        msg:"phone no already exist"
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ email },{ name }]});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = new User({ name, email, password, phone });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token=jwt.sign({
      id:user._id,role:user.role},
      "secret123"
    );
    res.json({
      message: "Login success",
      user,
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;