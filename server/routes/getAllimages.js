import { Router } from 'express'
import auth from '../middleware/auth.js'
import {getAllimagesController, deleteImageController} from '../controller/uploadimage.controller.js'
import upload from '../middleware/multer.js'

const getImagesRouter = Router()


getImagesRouter.get("/all-images",getAllimagesController)
// delete single image by id
getImagesRouter.delete("/:id", deleteImageController)
export default getImagesRouter