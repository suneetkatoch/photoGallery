import jwt from 'jsonwebtoken'
const auth = (request, response, next) => {
    try {
        const { accessToken } = request.cookies || request.headers?.authorization?.split(" ")[1];
        if(!accessToken){
            return response.status(401).json({
                message : "unauthorized",
                error : true,
                success : false
            })
        }
        const verify = jwt.verify(accessToken,process.env.JWT_SECRET)
        if(!verify){
            return response.json({
                message : "unauthorized",
                error : true,
                success : false
            })
        }
        request.userId=verify.userId
        next()
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export default auth
