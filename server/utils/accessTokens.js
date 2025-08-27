import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateAccessToken = async(userId)=>{
    return await jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "5h"
    })
}
const generateRefreshToken = async(userId)=>{
    return await jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "3d"
    })
}

export {generateAccessToken,generateRefreshToken}