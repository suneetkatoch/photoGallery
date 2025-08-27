import uploadImageClodinary from "../utils/uploadImageCloudniry.js";
import ImageModel from "../models/Images.modal.js";
const uploadImageController= async (req, res) => {
    try {
        const image=req.file;
         if(!image){
            return res.status(400).json({
                message: "Please upload an image",
                error: true,
                success: false
            });
        }
        const uplodedImage=await uploadImageClodinary(image);
        const  submitData=await ImageModel.create({
            image:uplodedImage.url
        });
        return res.status(200).json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: submitData
        });
       

        
       
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
        
    }
}
const getAllimagesController=async(req,res)=>{
    try {
        const images=await ImageModel.find({});
        return res.status(200).json({
            message: "Images fetched successfully",
            error: false,
            success: true,
            data: images
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export {uploadImageController,getAllimagesController};