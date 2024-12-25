"use client";
import { useEffect, useRef, useState } from "react";

import { useApi } from "@/hooks/useAPI";
import useTitle from "@/hooks/useTitle";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/Forms/AuthForm";
import {  toasterSuccess } from "@/components/core/Toaster";
import { loginValidationSchema } from "@/utils/validationSchemas";
import { setAuth, setUserId } from "@/redux/slices/auth.slice";
import { getErrorMessage } from "@/utils/errorHandler";

const Login = () => {
  useTitle("Login");

  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMesg, setSucessMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef<string>("");
  const router = useRouter();
  const { API } = useApi();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    emailRef.current = values.email;
    setLoading(true);
    const { success, data ,error} = await API.post("auth/login", values);
    setLoading(false);
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken}));
      dispatch(setUserId({image:data.image, id: data.id, userId:data.userId,firstName:data.firstName,lastName:data.lastName}));
      toasterSuccess("Login successful", 1000, "id");
      router.push("/home");
    } 
    else{
      const errorMessage = getErrorMessage(error.code);
      setErrorMessage(errorMessage);
    }
  };

  const handleResendActivationEmail = async () => {
    try {
      const email = emailRef.current;
      setLoading(true);
      const { success } = await API.post("auth/resend-activation-mail", {
        email,
      });
      setLoading(false);
      if (success) {
        setErrorMessage("");
        setInitialValues({
          email: "",
          password: "",
        });
        setSucessMsg(
          "Activation email resent! Please check your inbox or spam folder."
        );
      } else {
        alert(`Failed to resend activation email: ${errorMessage}`);
      }
    } catch (err) {
      setLoading(false);
      alert("An error occurred while trying to resend the activation email.");
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
        isLoading={isLoading}
        handleResendActivationEmail={handleResendActivationEmail}
        sucessActivationEmail={sucessMesg}
      />
  );
};

export default Login;
