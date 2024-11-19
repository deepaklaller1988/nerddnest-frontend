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
  firstname: string;
  email: string;
  password:string
}

interface LoginResponse {
  id: string;
  userId: string;
  email: string;
  lastName: string;
  accessToken: string;
}

interface ForgotResponse {
  email: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const handleError = (errorData: ApiError) => {
  const errorCode = errorData?.error?.code;
  const errorMessage = getErrorMessage(errorCode);
  if (errorCode) {
    toasterError(errorMessage || "An error has occurred", 10000, "id");
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: `${url}auth/` })(args, api, extraOptions);
    
    if (result.error) {
      const errorData = result.error.data as ApiError;
      handleError(errorData);
    }

    return result;
  },
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<RegisterResponse>, { email: string}>({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<ApiResponse<LoginResponse>, { email: string; password: string }>({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),

    forgotpassword: builder.mutation<ApiResponse<ForgotResponse>, { email: string; password: string }>({
      query: (userData) => ({
        url: "forgot-password",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useForgotpasswordMutation } = authApi;
