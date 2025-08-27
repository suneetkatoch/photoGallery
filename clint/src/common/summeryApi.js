

export const BaseUrl="http://localhost:8080"
const summerApi={
    login:{
        url:'/api/user/login',
        method:"post"
    },
   
  
    refreshToken:{
        url:'http://localhost:8080/api/user/refresh-token',
        method:"post"
    },
    
    logoutUser:{
        url:'http://localhost:8080/api/user/logout',
        method:"post"
    },
    
    uploadImage:{
        url:'http://localhost:8080/api/file/upload',
        method:"post"
    },
    getAllImages:{
        url:'http://localhost:8080/api/images/all-images',
        method:"get"
    },
    

}
export default summerApi