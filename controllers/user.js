
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";
export const getAllUsers=async (req, res,next) => {

try {
  
const users=await User.find()

if (users.length===0) {
  return next(new ErrorHandler("no users found",400))
}

res.status(200).json({
  success:true,
 users
})
} catch (error) {
  next(error)
}
  

}

  export const login=async(req,res,next)=>{

try {
  const {email,password} = req.body;
const user=await User.findOne({email}).select("+password")
if (!user) {
   return next(new ErrorHandler("Invalid Email or password",400))
}

const ismatch=await bcrypt.compare(password,user.password)

if (!ismatch)   return next(new ErrorHandler("Invalid Email or password",400))

sendCookies(user,res,`Welcome back ,${user.name}`,200)
} catch (error) {
  next(error)
}
  }

  export const  registerUser = async (req, res,next) => {
try {
  const {name,email,password}=req.body

  let user=await User.findOne({email})
  if (user)   return next(new ErrorHandler("user already exist",400))
 
  
  const hashedPassword = await bcrypt.hash(password,10)
 user= await User.create({name,email,password:hashedPassword})
sendCookies(user,res,"Registered successfully",201)
} catch (error) {
  next(error)
}
  }



export const getMyProfile=async(req,res)=>{

res.status(200).json({
  success:true,
  user:req.user,
})

}

export const logout=(req,res)=>{
  res.status(200).cookie("token","",
  {expires: new Date(Date.now()),
  
    sameSite:process.env.NODE_ENV==="Development"?"lax":"none" ,
    secure:process.env.NODE_ENV==="Development"?false:true ,
  }).json({
    success:true,
    user:req.user,
  })
}
