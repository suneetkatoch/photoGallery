import { Router } from 'express'
import auth from '../middleware/auth.js'
import {uploadImageController} from '../controller/uploadImage.controller.js'
import upload from '../middleware/multer.js'

const uploadRouter = Router()

uploadRouter.post("/upload",upload.single("image"),uploadImageController)

export default uploadRouter