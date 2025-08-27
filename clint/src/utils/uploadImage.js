import summerApi from "../common/summeryApi";
import axios from "axios";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios({
            ...summerApi.uploadImage,
            data: formData,
            withCredentials: true,
        });
        return response.data;
      

    } catch (error) {
     
      return error;
    }
  };
  export default uploadImage;