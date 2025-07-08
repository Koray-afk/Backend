import { app } from "./app.js";
import connectDB from "./db/index.js";   
// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

connectDB()
.then(()=>{
    // app.on catched unexpected errors 
    app.on('error',(err)=>{
        console.log("App-Level-error",err.message)
        throw err
    });
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })

})
.catch((error)=>{
    console.log("MONGODB connection failed at ",error)
})









//const app=express()
// This is how we connect database to backend using try catch and async await 
// Remember kaam itna he hai mongoose.connect
// this is the syntax of ifie function will execute immediately
// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         // after database we will add listeners 
//         app.on("error",(error)=>{
//             console.log(error)
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }
//     catch(error){
//         console.log(error)
//     }
// })()