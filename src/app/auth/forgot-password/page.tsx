"use client";

import useTitle from "@/hooks/useTitle";
import { useApi } from "@/hooks/useAPI";
import React, { useEffect, useState } from "react";
import AuthForm from "@/components/Forms/AuthForm";

import { getErrorMessage } from "@/utils/errorHandler";
import {  toasterSuccess } from "@/components/core/Toaster";
import { forgotValidationSchema } from "@/utils/validationSchemas";

export default function ForgotPassword() {
  useTitle("Lost Password");
  const { API } = useApi();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [initialValues] = useState<any>({
    email: "",
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    if (!isClient) return;
    setLoading(true);
    const { success ,error} = await API.post(
      "auth/forgot-password",
      values
    );
    setLoading(false);
    if (success) {
      setErrorMessage("");
      toasterSuccess("Please Check Your Register Gmail Id", 1000, "id");
    }
    else {
      const errorMessage = getErrorMessage(error.code);
      setErrorMessage(errorMessage);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
      <AuthForm
        type="forgot-password"
        initialValues={initialValues}
        validationSchema={forgotValidationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
  );
}
