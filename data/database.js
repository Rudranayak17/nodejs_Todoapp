import mongoose from "mongoose"

export const connectDB=()=>{

    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backenddApi"
    }).then((c)=>{console.log("DataBase Connected",c.connection.host)}).catch((e)=>{console.log(e)})
}