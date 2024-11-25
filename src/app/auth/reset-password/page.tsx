"use client";
import {
  useResetPasswordMutation,
} from "@/redux/services/auth";
import { toasterError, toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { resetValidationSchema } from "@/utils/validationSchemas";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/auth.slice";
import { getErrorMessage } from "@/utils/errorHandler";

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
  const { API } = useApi();
  const dispatch = useDispatch();
  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { success, data, error } = await API.post('auth/reset-password', { ...values, token });
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken, userId: data.id }));
      toasterSuccess("Password changed successfully", 1000, "id");
      route.push("/home");
    } else {
      const errorMessage = getErrorMessage(error.code);
      toasterError(errorMessage, 1000, "id"); 
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
