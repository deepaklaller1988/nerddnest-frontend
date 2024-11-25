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

  const [initialValues] = useState<ForgotPasswordFormValues>({
    email: "",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleSubmit = async (values: typeof initialValues) => {
    if (!isClient) return;
    const { success, data, error } = await API.post(
      "auth/forgot-password",
      values
    );
    if (success) {
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
    }
  };

  if (!isClient) {
    return null; // Or a loading spinner, etc.
  }

  return (
    <div>
      <AuthForm
        type="forgot-password"
        initialValues={initialValues}
        validationSchema={forgotValidationSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
