import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Signup

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists", success: false });
    }

    // ✅ Create a new user (rename variable to avoid conflict)
    const newUser = new User({ name, email, password: await bcrypt.hash(password, 10), role });

    await newUser.save();
    return res.status(200).json({ msg: "User created successfully", success: true });

  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", success: false, error: error.message });
  }
};

//login

export const login = async(req,res) =>{
  try {
    const {email,password,role}= req.body;
    const user = await User.findOne({email:email});
    console.log("user detail",user,email,password,role);
    
    const errorMsg=`Auth faiḷed email or password is wrong!`
    const hashedPassword = await bcrypt.hash("yourpassword", 10);
console.log("Hashed Password:", hashedPassword);

    // const user = await User.findOne({email:email});
    if(!user){
      return res.status(400).json({msg:errorMsg,success:false});
    }
    const isPassEql=await bcrypt.compare(password,user?.password);
    if(!isPassEql){
      return res.status(403).json({msg:errorMsg,success:false});
    }
    const token=jwt.sign({email:user.email,_id:user._id,role:user.role,password:hashedPassword},
      process.env.JWT_SECRET,{expiresIn:'2h'}
    )
   
    return res.status(200).json({msg:"Login successfully",success:true,token,email,name:user.name,id:user._id,role:user.role,error:user.errorMsg,password:hashedPassword});
    
  } catch (error) {
    return res.status(404).json({msg:error.msg,success:false});
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
};export const saveUserData = async (req, res) => {
  try {
    const { id, testDetails } = req.body; // ✅ Expect testDetails

    console.log("Received Data:", req.body); // ✅ Log request body

    if (!id) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    if (!testDetails || Object.keys(testDetails).length === 0) {
      return res.status(400).json({ msg: "Test details are missing" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id.trim(),
      { $push: { userData: testDetails } }, // ✅ Store testDetails inside userData array
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("Updated User Data:", updatedUser);

    res.status(200).json({ msg: "Test data saved successfully", updatedUser });
  } catch (error) {
    console.error("Error Saving Data:", error);
    return res.status(500).json({ msg: error.message });
  }
};


// export const saveUserData = async (req, res) => {
//   try {
//     const {  data,id } = req.body;
//     if (!id) {
//       return res.status(400).json({ msg: "id is required" });
//     }

//     // Remove id from data
//     // const { id: removedId, ...dataWithoutId } = data; // Correctly remove id

//     const updatedUser = await User.findByIdAndUpdate(
//       id.trim(),
//       { $push: { userData: { testResult: dataWithoutId } } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ msg: "no such user exists" });
//     }

//     res.status(200).json({ updatedUser });
//     // Removed redundant return statement
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };