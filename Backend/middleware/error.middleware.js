import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
    //Agar error ApiError ka instance hai - custom error
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message:err.message
        })
    }

    // koi unexpected error - like MongoDb crash etc
    // Development mai stack trace dikhao, production mai nhi
    const isDev = process.env.NODE_ENV === 'development'

    return res.status(500).json({
        success: false,
        statusCode: 'Internal Server Error',
        ...(isDev && {stack: err.stack})
    })

}

export default errorMiddleware