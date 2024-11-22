"use client";
import {
  useResetPasswordMutation,
} from "@/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { resetValidationSchema } from "@/utils/validationSchemas";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  useTitle("Reset Password");
  const route = useRouter();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerResetPassword route={route} />
    </Suspense>
  );
}

function InnerResetPassword({ route }: { route: ReturnType<typeof useRouter> }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const dataToSubmit = { ...values, token };
    await resetPassword(dataToSubmit).unwrap();
    toasterSuccess("Password changed successfully", 1000, "id");
    route.push("/home");
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
