// pages/auth/login.tsx
"use client"
import { useRegisterMutation } from "@/app/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import * as Yup from "yup";

const Login = () => {
  const [login, { isLoading }] = useRegisterMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await login(values).unwrap();
      toasterSuccess("Login successful", "3000", "id");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return <AuthForm type="login" initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} />;
};

export default Login;
