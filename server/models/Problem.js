//const mongoose = require("mongoose");
import mongoose from "mongoose";
const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  tags: [String],
  solution:String,
  explaination:String
});
export default mongoose.model("Problem", problemSchema);
