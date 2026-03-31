import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLODINARY_CLOUD_NAME,
    api_key : process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLODINARY_API_SECRET_KEY
})

const uploadImageClodinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "binkeyit"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

const deleteImageCloudinary = async(publicId) => {
    if(!publicId) return { result: 'not_found' }
    const result = await new Promise((resolve,reject)=>{
        cloudinary.uploader.destroy(publicId,(error,deleteResult)=>{
            if(error) return resolve({ error })
            return resolve(deleteResult)
        })
    })
    return result
}

export default uploadImageClodinary
export { deleteImageCloudinary }