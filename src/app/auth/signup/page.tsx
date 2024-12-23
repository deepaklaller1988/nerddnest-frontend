"use client";

import { useApi } from "@/hooks/useAPI";
import useTitle from "@/hooks/useTitle";
import { useDispatch } from "react-redux";
import AuthForm from "@/components/Forms/AuthForm";
import { SignupFormValues } from "@/types/authInterfaces";
import { toasterSuccess } from "@/components/core/Toaster";
import { signupValidationSchema } from "@/utils/validationSchemas";
import { setAuth, setUserId } from "@/redux/slices/auth.slice";
import { getErrorMessage } from "@/utils/errorHandler";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loaders/Loader";

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
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    const { success, data, error } = await API.post("auth/register", values); setLoading(false);
    setLoading(false);
    const errorMessage = getErrorMessage(error?.code);
    setErrorMessage(errorMessage);
    if (success) {
      setSuccessMsg(data?.message);
      toasterSuccess("Registration successful", 1000, "id");
      setIsRegistered(true);
    }
  };

  const getVerifiedUser = async () => {
    setLoading(true);
    const { success, error, data } = await API.get(
      `auth/verify-account?type=${type}&token=${token}`
    );
    const errorMessage = getErrorMessage(error?.code);
    setErrorMessage(error);
    if (errorMessage == "Token Expired") {
    }
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken }));
      dispatch(setUserId({ image:data.image, id: data.id, userId: data.userId, firstName: data.firstName, lastName: data.lastName }));
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
          isLoading={isLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

const SignupWithSuspense = () => {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <Signup />
    </Suspense>
  );
};

export default SignupWithSuspense;
