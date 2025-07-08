import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    // Get user details form frontend
    // Validation not empty 
    // check if user already exixts - username or email like something unique 
    // check for image or check for avatar 
    // upload them to cloudinary - avatar
    // Create user Object - create entry in Data base 
    // Remove password and refresh tokens from database 
    // check for user Creation 
    // return response 


    const {username,fullName,email,password} = req.body
    // console.log("email",email)

    // if(fullName==""){
    //     throw new ApiError(400,"fullName is required here")
    // }
    // else if(email==""){
    //     throw new ApiError(400,"Enter valid Email")
    // }
    // else if(username==""){
    //     throw new ApiError(400,"Enter valid username")
    // }
    // else if(password==""){
    //     throw new ApiError(400,"Enter valid password")
    // }

    // One of the method is to check validation by this method or else you can do like 
    if([username,fullName,email,password].some((field)=>field.trim==="")){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or:[{email},{username}]
    })

    cconsole.log(existedUser)
  
    if (existedUser) {
        throw new ApiError(409, "User already exists with email or username");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadCloudnary(avatarLocalPath)
    const coverImage = await uploadCloudnary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(409,"Avatar file is required")
    }


    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshTokens"
    )


    if(!createdUser){
        throw new ApiError(500,"Something went wring while registering the user")
    }

    
    
 
})

export {registerUser}