"use client";

import {  toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { resetValidationSchema } from "@/utils/validationSchemas";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";
import { setAuth, setUserId } from "@/redux/slices/auth.slice";
import Loader from "@/components/Loaders/Loader";

export default function ResetPassword() {
  useTitle("Reset Password");
  const route = useRouter();

  return (
    <Suspense fallback={<div><Loader/></div>}>
      <InnerResetPassword route={route} />
    </Suspense>
  );
}

function InnerResetPassword({ route }: { route: ReturnType<typeof useRouter> }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { API } = useApi();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const { success, data} = await API.post('auth/reset-password', { ...values, token });
    setLoading(false);
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken}));
      dispatch(setUserId({ id: data.id, userId:data.userId,firstName:data.firstName,lastName:data.lastName}));
      toasterSuccess("Password changed successfully", 1000, "id");
      route.push("/home");
    }
    
    

};
  return (
      <AuthForm
        type="reset-password"
        initialValues={initialValues}
        validationSchema={resetValidationSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}

      />
  );
}
