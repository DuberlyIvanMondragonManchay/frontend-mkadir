import { v4 } from "uuid";
import { deleteImage,uploadImage } from "../../firebase/config";

export const uploadFileImage = async (img, clicksCount, setClicksCount) => {
    if (validateExtension(img)) {
        // selection for the first time
        if(clicksCount <=0){
            console.log("First time")
            if(window.localStorage.getItem('image_name')){
                try {
                    deleteImage(window.localStorage.getItem('image_name'))
                  } catch (error) {
                    
                  }
                window.localStorage.removeItem('image_name')
                window.localStorage.setItem('image_name',v4())
            }
        }
        // Create name image
        const urlImage = await uploadImage(img,window.localStorage.getItem('image_name'));
        setClicksCount(clicksCount+1)
        return urlImage;
    }
  };


const validateExtension =  (img) => {
    const fileExtension = img.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif','svg'];
    if (allowedExtensions.includes(fileExtension)) return true
}