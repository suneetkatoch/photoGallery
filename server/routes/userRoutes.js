import { Router } from 'express'
const userRouter=Router()
import { registerUserController,loginUserController,logoutUserController} from '../controller/user.controller.js'
import auth from '../middleware/auth.js'


// routes
userRouter.post('/register',registerUserController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',auth,logoutUserController)

export default userRouter;