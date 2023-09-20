import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
      
    },
    description:{
        type:String,
        required:true,
    
    },
    iscompleted:{
       type:Boolean,
       default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        required:true,
        type:Date,
        default:Date.now()
    }
})
export const Task=mongoose.model('Task',taskSchema)