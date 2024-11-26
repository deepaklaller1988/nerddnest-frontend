"use client";
import React, { useEffect, useState } from "react";
import { toasterError, toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { forgotValidationSchema } from "@/utils/validationSchemas";
import { ForgotPasswordFormValues } from "@/types/authInterfaces";
import { setAuth } from "@/redux/slices/auth.slice";
import { getErrorMessage } from "@/utils/errorHandler";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  useTitle("Lost Password");
  const { API } = useApi();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [initialValues] = useState<ForgotPasswordFormValues>({
    email: "",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    if (!isClient) return;
    setLoading(true);
    const { success, data, error } = await API.post(
      "auth/forgot-password",
      values
    );
    setLoading(false);
    if (success) {
      setErrorMessage("");
      dispatch(
        setAuth({
          accessToken: data.accessToken,
          userId: data.id,
        })
      );
      toasterSuccess("Please Check Your Register Gmail Id", 1000, "id");
    } else {
      const errorMessage = getErrorMessage(error.code);
      toasterError(errorMessage, 1000, "id");
      setErrorMessage(errorMessage);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <AuthForm
        type="forgot-password"
        initialValues={initialValues}
        validationSchema={forgotValidationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
}
