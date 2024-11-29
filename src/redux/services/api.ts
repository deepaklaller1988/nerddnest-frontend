import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import Error from "@/utils/Error";
import { toasterError } from "@/components/core/Toaster";
import { clearAuth, setAuth } from "../slices/auth.slice";
import { logoutUser } from "@/utils/logout";

interface ApiError {
  error: {
    code: string;
    message: string;
  };
}


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    else if(localStorage.getItem("accessToken")){
        headers.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

const handleError = async (errorData: ApiError) => {
  const errResponse = await Error.handle(errorData)
  
  if (!errResponse) {
    toasterError(errorData?.error?.code || "An error has occurred", 10000, "id");
  }

  return errResponse;
};


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const errorData = result.error.data as ApiError;
    const error = await handleError(errorData);

    if(error.toast){
      toasterError(error.toast);
    }

    if(error.signOut){
      logoutUser()
    }

    if(error.refresh){
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh-access",
          method: "GET"
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { data: {accessToken} }: any = refreshResult.data;
        api.dispatch(setAuth({ accessToken }));
        localStorage.setItem("accessToken", accessToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuth());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    dynamicRequest: builder.mutation({
      query: ({
        method,
        url,
        body,
      }: {
        method: string;
        url: string;
        body?: any;
      }) => ({
        url,
        method,
        body,
        credentials: "include",
      }),
    }),
  }),
});

export const { useDynamicRequestMutation } = apiSlice;
