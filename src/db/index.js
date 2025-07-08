import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

console.log(process.env.PORT)
console.log(process.env.MONGODB_URL)
const connectDB = async()=>{
   
    try{
        const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected || DB host: ${connnectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MongoDb connecetion error",error)
        // throw error
        process.exit 
    }
}


// Remember DB in is another continent 
// Mongoose will give you an returned object 

export default connectDB