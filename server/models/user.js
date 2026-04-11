import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
 name:String,
  email:String,
  password:String,
  phone:String,
  role:{
    type:String,
    default:"user",
  },
});
const user=mongoose.models.user||mongoose.model("user",userSchema);
//export default mongoose.model("User",userSchema);
export default user;