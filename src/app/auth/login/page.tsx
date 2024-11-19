"use client";
import { useLoginMutation } from "@/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { loginValidationSchema } from "@/utils/validationSchemas";
import { LoginFormValues } from "@/types/authInterfaces";
import { useRouter } from "next/navigation";

const Login = () => {
  useTitle("Login");
  const router = useRouter()

  const [login, { isLoading }] = useLoginMutation(); 

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
      await login(values).unwrap();
      toasterSuccess("Login successful", 1000, "id");
      router.push("/home");
  };

  return (
    <AuthForm
      type="login"
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
