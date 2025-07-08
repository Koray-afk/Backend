class ApiResponse{
    constructor(statusCode,data,message="Success"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success = statusCode<400 
    }
}

export {ApiResponse}

// StatusCode < 400 means there is a client side error in this 
