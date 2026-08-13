import express from 'express';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware.js';
import healthRouter from './routes/health.routes.js'
import ApiError from './utils/ApiError.js';


const app = express();

//*CORS middleware - frontend se requests allow krne ke liye.
app.use(cors());

//* JSON body parse krne ke liye
app.use(express.json());



app.use('/api/v1/health', healthRouter);



//* 404 Handler
app.use((req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.url}`))
})


//* Error Middleware
app.use(errorMiddleware);

export default app;