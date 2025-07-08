import multer from "multer";
// Read documentation of multer and cloudinary 

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({storage:storage})

// this is used as a middleware

