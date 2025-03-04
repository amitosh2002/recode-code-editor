import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Signup

export const signUp = async(req,res) =>{
  try {
    const {name,email,role,password}= req.body;
    const user = await User.findOne({email});
    // const user = await User.findOne({email:email});
    if(user){
      return res.status(400).json({msg:"User already exists",sucess:false});
    }
    const User = new User({name,email,role,password});
    User.password= await bcrypt.hash(password,10)
    await User.save();
    return res.status(200).json({msg:"User created successfully",sucess:true});
    
  } catch (error) {
    return res.status(404).json({msg:error.message,sucess:false});
    
  }
}
//login

export const login = async(req,res) =>{
  try {
    const {email,role,password}= req.body;
    const user = await User.findOne({email});
    const errorMsg=`Auth failed email or password is wrong!`
    // const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).json({msg:errorMsg,sucess:false});
    }
    const isPassEql=await bcrypt.compare(password,user.password);
    if(!isPassEql){
      return res.status(403).json({msg:errorMsg,sucess:false});
    }
    const token=jwt.sign({email:user.email,_id:user._id},
      process.env.JWT_SECRET,{expiresIn:'24h'}
    )
   
    return res.status(200).json({msg:"Login successfully",sucess:true,token,role:user.role});
    
  } catch (error) {
    return res.status(404).json({msg:error.message,sucess:false});
    
  }
}
 
export const userList = async (req, res) => {
  try {
    const allUser = await User.find();
    if (!allUser) {
      return res.status(404).json({ msg: "no user found" });
    }
    return res.status(200).json({ allUser });
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};
export const singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneUSer = await User.findById(id);
    if (!oneUSer) {
      return res.status(404).json({ msg: "no such user exists" });
    }
    return res.status(200).json({ oneUSer });
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const removeUSer = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const removeUser = await User.findById(id);
    if (!removeUser) {
      return res.status(404).json({ msg: "no user found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
