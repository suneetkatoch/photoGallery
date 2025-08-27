import axios from "axios";

import summeryApi from "../common/summeryApi";

const fetchUserDetails = async () => {
    console.log("fetch user details");
  try {
    const userDetails=await axios({
        ...summeryApi.getUserDetails,
        withCredentials:true
    })
    return userDetails
    
  } catch (error) {
    console.log(error);
    
  }
};
export default fetchUserDetails;