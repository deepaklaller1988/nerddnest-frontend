
export const uploadFile = async (file: File,API:any) => {
  const formData = new FormData();
  formData.append("file", file);  
    const { success, data, error } = await API.postFile("file/upload", formData);
  
    if (success) {
     return data;
    } else {
      console.error("File upload failed:", error);
    }
  };


  export const uploadMultiFile = async (files: File[], API: any) => {
    const formData = new FormData();
  
    files.forEach(file => {
      formData.append('files', file);
    });
  
    try {
      const { success, data, error } = await API.postFile("file/multi-uploads", formData);
  
      if (success) {
        const uploadedFilesData = data.map((file: any) => file.data);

        return uploadedFilesData;
            } else {
        console.error("File upload failed:", error);
      }
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };