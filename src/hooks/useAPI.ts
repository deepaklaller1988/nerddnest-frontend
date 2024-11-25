import { getErrorMessage } from "@/utils/errorHandler";
import { useDynamicRequestMutation } from "../redux/services/api";

export const useApi = () => {
  const [dynamicRequest, result] = useDynamicRequestMutation();

  const API = {
    get: async (url: string, body?: any ) => {
        try {
          const response = await dynamicRequest({ method: 'GET', url, body }).unwrap();
          return { success: true, data: response.data };
        } catch (error: any) {
          const errorMessage = getErrorMessage(error.code);
          // toasterError(errorMessage, 1000, "id"); 
          return { success: false, error: error.data?.error || error };
        }
      },
    post: async (url: string, body?: any ) => {
        try {
          const response = await dynamicRequest({ method: 'POST', url, body }).unwrap();
          return { success: true, data: response.data };
        } catch (error: any) {
          const errorMessage = getErrorMessage(error.code);
          // toasterError(errorMessage, 1000, "id"); 
          console.log(error.data?.error,"=============")
          return { success: false, error: error.data?.error || error };
        }
      },
    put: async (url: string, body?: any ) => {
        try {
          const response = await dynamicRequest({ method: 'PUT', url, body }).unwrap();
          return { success: true, data: response.data };
        } catch (error: any) {
          const errorMessage = getErrorMessage(error.code);
          return { success: false, error: error.data?.error || error };
        }
      },
    delete: async (url: string, body?: any ) => {
        try {
          const response = await dynamicRequest({ method: 'DELETE', url, body }).unwrap();
          return { success: true, data: response.data };
        } catch (error: any) {
          const errorMessage = getErrorMessage(error.code);
          return { success: false, error: error.data?.error || error };
        }
      },
  }


  return { API, result };
};
