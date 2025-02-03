import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

import validator from 'validator';
import bcryptjs from 'bcryptjs';


//Login User
const loginUser = async (req,res)=>{

    const {email,password} = req.body;
try {
    

    const user = await userModel.findOne({email});
    console.log(user);

    if (!user){
        res.json({success:false,message:"User doesn't exist"})
    }
   
    const isMatch = await bcryptjs.compare(password,user.password);
    

    if (!isMatch){
        res.json({success:false,message:"Invalid Credentials"})
    }

    const token = createToken(user._id);
    await res.json({success : true,token});
}
 catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}
//Token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Register User
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        //checking whether email already exists
        const exists = await userModel.findOne({email});
        if (exists){
           return res.json({success : false,message : "Email already exists"})
        }

        //validating email format and password
        if (!validator.isEmail(email)){
            return res.json({success : false,message : "Please enter a valid email"})
        }

        if (password.length < 8){
            return res.json({success : false,message : "Please enter strong password"})
        }

        //hashing user passowrd
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success : true,token})


        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export {loginUser,registerUser}
