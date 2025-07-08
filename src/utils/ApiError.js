// Here we will determine that jo bhi errors aaenge vo ise tarah aaenge 

class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        // here we are overriding some of the values 
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message= message
        this.success = false
        this.errors = errors

        if (stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}



//  API error ki class
export default {ApiError}