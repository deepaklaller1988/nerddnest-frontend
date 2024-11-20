"use client";
import { useRegisterMutation } from "@/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { SignupFormValues } from "@/types/authInterfaces";
import { signupValidationSchema } from "@/utils/validationSchemas";


const Signup = () => {
  useTitle("Register an Account");

  const [register, { isLoading }] = useRegisterMutation();

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
  
  const handleSubmit = async (values: typeof initialValues) => {
      await register(values).unwrap();
      toasterSuccess("Registration successful", 1000, "id");
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
