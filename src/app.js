import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser())
app.use(express.static('public'))

//routes import 
import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)  // "/users" will act as a prefix and redirect to userRouter 

// the final url becomes http://localhost:8000/api/v1/users/register

export {app}

// We have used app.use because we have to register middleware in our application 
