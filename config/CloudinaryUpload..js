/*import axios from "axios";

const CLOUD_NAME = "dlwlvwced"; 
const UPLOAD_PRESET = "your_upload_preset"; 

export const uploadImageToCloudinary = async (imageUri) => {
  const data = new FormData();
  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  });
  data.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};*/
// config/CloudinaryConfig.js
/*export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlwlvwced/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";*/

// config/CloudinaryConfig.js
/*export const CLOUDINARY_UPLOAD_PRESET = "my_upload_preset";
export const CLOUDINARY_CLOUD_NAME = "dlwlvwced";

export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;*/
// config/CloudinaryConfig.js
// utils/CloudinaryUpload.js
import axios from "axios";

export const uploadImageToCloudinary = async (imageUri) => {
  try {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "my_upload_preset"); // your preset
    data.append("cloud_name", "dlwlvwced");   // your cloud name

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlwlvwced/image/upload",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data.url;
  } catch (error) {
    console.log("Cloudinary Upload Error: ", error);
    throw error;
  }
};


