
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

  export const uploadProfileImage = async (file: File, userId: number, API: any) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { success, data, error } = await API.postFile("file/upload", formData); // Upload the file

        if (!success) {
            console.error("File upload failed:", error);
            throw new Error(error || "File upload failed");
        }

        const jsonResponse = await API.post("users/upload-profile-image", {
            userId,
            profileUrl:data,
        });

        const { success: jsonSuccess, data: jsonData, error: jsonError } = jsonResponse;

        if (jsonSuccess) {
            return jsonData;
        } else {
            console.error("Profile update failed:", jsonError);
            throw new Error(jsonError || "Profile update failed");
        }
    } catch (error) {
        console.error("Upload process failed:", error);
        throw error;
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