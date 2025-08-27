import express from 'express';
import cors from 'cors';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';
import getImagesRouter from './routes/getAllimages.js';
import uploadRouter from './routes/uploadRoutes.js';

const port = process.env.PORT || 8080;
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy:false,
}));
app.use(morgan('dev'));


// routes
app.use('/api/user',userRouter);
app.use("/api/file",uploadRouter)
app.use('/api/images',getImagesRouter);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
});

