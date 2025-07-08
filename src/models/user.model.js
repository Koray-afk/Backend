import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    fullName:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true
    },
    avatar:{
        type:String,  // claudinary url
        require:true,
    },
    coverImage:{
        type:String, // claudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        require:[true,"password is required"]
    },
    refreshTokens:{
        type:String
    }

},{timestamps:true})

// Now time for our pre middleware 
// pre check before sending data 
const saltrounds = 10
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,saltrounds);
        next()
    }
    else{
        return next()
    }
})

// Desining custom hooks and there can be multiple methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare("password",this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)



// To enable searching field true u have to enable index = true 
// In JWT we have user.payload.signature
 