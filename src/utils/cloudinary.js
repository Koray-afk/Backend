import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'  // help in CRUD operations

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


// Upload an image
const uploadResult = await cloudinary.uploader
.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    }
)
.catch((error) => {
    console.log(error);
});

const uploadCloudnary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        // upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        // file has been uploaded successfully
        console.log("File has been uploaded on clowdinary",response.url);
        // fs.unlinkSync(localFilePath)
        return response
    }
    catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export {uploadCloudnary}

