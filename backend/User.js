import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    user:String,
    score:String,
    level:String
})
export default mongoose.model('User',userSchema)