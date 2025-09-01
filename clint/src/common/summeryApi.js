

export const BaseUrl="https://photogallery-5.onrender.com"
const summerApi={
    login:{
        url:'https://photogallery-5.onrender.com/api/user/login',
        method:"post"
    },
   
  
    refreshToken:{
        url:'https://photogallery-5.onrender.com/api/user/refresh-token',
        method:"post"
    },
    
    logoutUser:{
        url:'https://photogallery-5.onrender.com/api/user/logout',
        method:"post"
    },
    
    uploadImage:{
        url:'https://photogallery-5.onrender.com/api/file/upload',
        method:"post"
    },
    getAllImages:{
        url:'https://photogallery-5.onrender.com/api/images/all-images',
        method:"get"
    },
    

}
export default summerApi