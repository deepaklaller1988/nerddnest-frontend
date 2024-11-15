"use client";
import { useRegisterMutation } from "@/app/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import { loginValidationSchema } from "@/utils/validationSchemas";

const Login = () => {
  const [login, { isLoading }] = useRegisterMutation();

  const initialValues  = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await login(values).unwrap();
      toasterSuccess("Login successful", "3000", "id");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <AuthForm
      type="login"
      isLoading ={isLoading}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
