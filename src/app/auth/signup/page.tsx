// pages/auth/signup.tsx
"use client"
import * as Yup from "yup";
import { useRegisterMutation } from "@/app/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const initialValues: any = {
    email: "",
    confirmemail: "",
    password: "",
    confirmpassword: "",
    firstname: "",
    lastname: "",
    handle: "",
    dob: "",
    location: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    confirmemail: Yup.string().oneOf([Yup.ref("email")], "Emails must match").required("Confirm Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    handle: Yup.string().required("Handle is required"),
    dob: Yup.date().required("Date of Birth is required"),
    location: Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    try {
      await register(values).unwrap();
      toasterSuccess("Registration successful", "3000", "id");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <AuthForm
      type="signup"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Signup;
