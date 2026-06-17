
import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },

  tags: {
    type: [String],
    default: []
  },

  input: {
    type: String,
    default: ""
  },

  output: {
    type: String,
    default: ""
  },

  explaination: {   //  fixed spelling
    type: String,
    default: ""
  },

  solution: {
    type: String,
    default: ""
  }

}, { timestamps: true }); //  createdAt, updatedAt

export default mongoose.model("Problem", problemSchema);