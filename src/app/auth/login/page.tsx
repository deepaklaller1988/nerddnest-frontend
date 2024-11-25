"use client";
import { useLoginMutation } from "@/redux/services/auth";
import { toasterError, toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { loginValidationSchema } from "@/utils/validationSchemas";
import { LoginFormValues } from "@/types/authInterfaces";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "@/utils/errorHandler";
import { setAuth } from "@/redux/slices/auth.slice";

const Login = () => {
  useTitle("Login");
  const router = useRouter()

  const [login, { isLoading }] = useLoginMutation(); 
  const {API} = useApi();
  const dispatch = useDispatch();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { success, data, error } = await API.post('auth/login', values);
    if (success) {
      dispatch(setAuth({ accessToken: data.accessToken, userId: data.id }));
      toasterSuccess("Login successful", 1000, "id");
      router.push("/home");

    } else {
      const errorMessage = getErrorMessage(error.code);
      toasterError(errorMessage, 1000, "id"); 
    }


};
  return (
    <>
    <AuthForm
      type="login"
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    />
    
    </>
  );
};

export default Login;
