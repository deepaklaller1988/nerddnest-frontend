"use client";
import { useRegisterMutation } from "@/app/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { resetValidationSchema } from "@/utils/validationSchemas";
import React from "react";

export default function ResetPassword() {
  useTitle("Reset Password");

  const [register, { isLoading }] = useRegisterMutation();

  const initialValues = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await register(values).unwrap();
      toasterSuccess("Registration successful", 3000, "id");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <AuthForm
        type="reset-password"
        isLoading={isLoading}
        initialValues={initialValues}
        validationSchema={resetValidationSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
