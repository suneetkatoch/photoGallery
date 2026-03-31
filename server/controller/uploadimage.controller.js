import uploadImageClodinary, { deleteImageCloudinary } from "../utils/uploadImageCloudniry.js";
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
            image:uplodedImage.secure_url || uplodedImage.url,
            public_id: uplodedImage.public_id || ""
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
const deleteImageController = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({ message: "Invalid id", error:true, success:false })
        }

        const imageDoc = await ImageModel.findById(id);
        if(!imageDoc){
            return res.status(404).json({ message: "Image not found", error:true, success:false })
        }

        const publicId = imageDoc.public_id;

        // Attempt to remove from Cloudinary if we have public_id
        if(publicId){
            const delRes = await deleteImageCloudinary(publicId);
            // cloudinary returns { result: 'ok' } or 'not found' etc.
            if(delRes && delRes.error){
                // don't delete DB record if cloudinary deletion failed
                return res.status(500).json({ message: "Failed to delete image from cloud storage", error:true, success:false, details: delRes.error })
            }
        }

        // delete DB record
        await ImageModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Image deleted successfully", error:false, success:true, data: { _id: id } })

    } catch (error) {
        return res.status(500).json({ message: error.message || error, error:true, success:false })
    }
}
export {uploadImageController,getAllimagesController, deleteImageController};