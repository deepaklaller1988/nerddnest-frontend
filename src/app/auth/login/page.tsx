"use client";
import { useLoginMutation } from "@/redux/services/auth";
import { toasterError, toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { loginValidationSchema } from "@/utils/validationSchemas";
import { LoginFormValues } from "@/types/authInterfaces";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "@/utils/errorHandler";
import { setAuth } from "@/redux/slices/auth.slice";
import { useEffect, useState } from "react";

const Login = () => {
  useTitle("Login");

  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { API } = useApi();
  const dispatch = useDispatch();
  
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    const { success, data, error } = await API.post("auth/login", values);
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken, userId: data.id }));
      toasterSuccess("Login successful", 1000, "id");
      router.push("/home");
    } else {
      const errorMessage = getErrorMessage(error.code);
      setErrorMessage(errorMessage);
      toasterError(errorMessage, 1000, "id");
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <AuthForm
      type="login"
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default Login;
