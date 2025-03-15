import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/apiError.js'
import path from "path";

const app = express()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes 
import userRouter from './routes/user.route.js'
import homeRouter from './routes/home.route.js'
app.use('/api/v1/users', userRouter)
app.use('/api/v1/home', homeRouter)

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors || [],
        });
    }

    // Fallback for unknown errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error : err
    });
});
export {app}