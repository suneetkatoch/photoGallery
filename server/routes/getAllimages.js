import { Router } from 'express'
import auth from '../middleware/auth.js'
import {getAllimagesController} from '../controller/uploadImage.controller.js'
import upload from '../middleware/multer.js'

const getImagesRouter = Router()


getImagesRouter.get("/all-images",getAllimagesController)
export default getImagesRouter