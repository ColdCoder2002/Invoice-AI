import express from 'express';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware.js';
import healthRouter from './routes/health.routes.js'
import ApiError from './utils/ApiError.js';
import User from './models/user.model.js';
import asyncHandler from './utils/asyncHandler.js';
import ApiResponse from './utils/ApiResponse.js';


const app = express();

//*CORS middleware - frontend se requests allow krne ke liye.
app.use(cors());

//* JSON body parse krne ke liye
app.use(express.json());



//app.use('/api/v1/health', healthRouter);
app.get('/api/v1/test-users', asyncHandler(async (req, res) => {
    // const user = await User.create({
    //     name: 'Bhaskar',
    //     email: 'bhaskar2@test.com',
    //     password: 'test1234',
    //     role:'owner'
    // })
    const users = await User.find().select('-password')

    res.status(200).json(
        new ApiResponse(200, 'User created!', users)
    )
}))

//Test-2
app.get('/api/v1/test-find', asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: 'bhaskar2@test.com' })
    if (!user) {
        throw new ApiError(404, 'User not found!')
    }
    res.status(200).json(
        new ApiResponse(200, 'User fetched!', user)
    )
}))


//Test-3
app.delete('/api/v1/test-delete/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    //const parseID = parseInt(id)
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, 'User not found!')
    }

    res.status(200).json(
        new ApiResponse(200, 'User deleted!', null)
    )
}))




//* 404 Handler
app.use((req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.url}`))
})


//* Error Middleware
app.use(errorMiddleware);

export default app;