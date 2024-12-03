
export const uploadFile = async (file: File,API:any) => {
    const { success, data, error } = await API.postFile("file/upload", file);
  
    if (success) {
      console.log("File uploaded successfully:", data);
    } else {
      console.error("File upload failed:", error);
    }
  };
  