/*import axios from "axios";

export const uploadToCloudinary = async (fileUri, folder = "college") => {
  const data = new FormData();
  data.append("file", { uri: fileUri, type: "image/jpeg", name: "upload.jpg" });
  data.append("upload_preset", "my_upload_preset");
  data.append("folder", folder);

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dlwlvwced/image/upload", data);
    return res.data.secure_url;
  } catch (err) {
    console.log("Cloudinary upload error:", err);
    return null;
  }
};*/
export const uploadToCloudinary = async (uri, folder) => {
    const data = new FormData();
    data.append("file", { uri, type: "image/jpeg", name: "upload.jpg" });
    data.append("upload_preset", "my_upload_preset");
    data.append("folder", folder);
  
    const res = await fetch("https://api.cloudinary.com/v1_1/ldwlvwced/image/upload", {
      method: "POST",
      body: data
    });
    const json = await res.json();
    return json.secure_url;
  };
  