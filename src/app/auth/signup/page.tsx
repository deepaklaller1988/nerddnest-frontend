"use client";
import { useRegisterMutation } from "@/app/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import { signupValidationSchema } from "@/utils/validationSchemas";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const initialValues = {
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

  const handleSubmit = async (values: typeof initialValues) => {
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
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={signupValidationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default Signup;
