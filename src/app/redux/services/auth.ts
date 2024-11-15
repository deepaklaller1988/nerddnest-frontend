import { toasterError } from "@/components/core/Toaster";
import { getErrorMessage } from "@/utils/errorHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: ApiError;
}

interface RegisterResponse {
  id: string;
  username: string;
  email: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: `${url}api/v1/`,
    })(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data as ApiError; 
      const errorCode = errorData?.error?.code;
      const errorMessage = getErrorMessage(errorCode);

      if (errorCode) {
        toasterError(errorMessage || "An error has occurred", 10000, "id");
      }
    }

    return result;
  },
  endpoints: (builder) => ({
    register: builder.mutation<
      ApiResponse<RegisterResponse>,
      { username: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
