"use client";

import { toasterError, toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { SignupFormValues } from "@/types/authInterfaces";
import { signupValidationSchema } from "@/utils/validationSchemas";
import { setAuth } from "@/redux/slices/auth.slice";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "@/utils/errorHandler";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const Signup = () => {
  useTitle("Register an Account");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const { API } = useApi();
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isClient, setIsClient] = useState(false);

  const initialValues: SignupFormValues = {
    email: "",
    confirmemail: "",
    password: "",
    confirmpassword: "",
    firstname: "",
    lastname: "",
    handle: "",
    dob: "",
    location: "",
    agree: false,
  };

  useEffect(() => {
    setIsClient(true);
    if (type && token) {
      getVerifiedUser();
    }
  }, [type, token]);

  const handleSubmit = async (values: typeof initialValues) => {
    const { success, data, error } = await API.post("auth/register", values);
    const errorMessage = getErrorMessage(error?.code);
    setErrorMessage(errorMessage);
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken, userId: data.id }));
      setSuccessMsg(data?.message);
      toasterSuccess("Registration successful", 1000, "id");
      setIsRegistered(true);
    } else {
      toasterError(errorMessage, 1000, "id");
    }
  };

  const getVerifiedUser = async () => {
    const { success, error } = await API.get(
      `auth/verify-account?type=${type}&token=${token}`
    );
    const errorMessage = getErrorMessage(error?.code);
    setErrorMessage(errorMessage);
    if (success) {
      setIsActivated(true);
      setSuccessMsg(
        "Your Account is Successfully Verified! Click on Ok Button"
      );
    } else {
      setErrorMessage(errorMessage);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <AuthForm
          type="signup"
          isActivated={isActivated}
          successMsg={successMsg}
          errorMessage={errorMessage}
          isRegistered={isRegistered}
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </>
  );
};

const SignupWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signup />
    </Suspense>
  );
};

export default SignupWithSuspense;
