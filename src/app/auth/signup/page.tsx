"use client";
import { useRegisterMutation } from "@/redux/services/auth";
import { toasterSuccess } from "@/components/core/Toaster";
import AuthForm from "@/components/Forms/AuthForm";
import useTitle from "@/hooks/useTitle";
import { SignupFormValues } from "@/types/authInterfaces";
import { signupValidationSchema } from "@/utils/validationSchemas";
import { setAuth } from "@/redux/slices/auth.slice";
import { useApi } from "@/hooks/useAPI";
import { useDispatch } from "react-redux";


const Signup = () => {
  useTitle("Register an Account");

  const [register, { isLoading }] = useRegisterMutation();
  const {API} = useApi();
  const dispatch = useDispatch();

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
      // await register(values).unwrap();
      const { success, data, error } = await API.post('auth/register', values);
      console.log(success, data, error);

      if (success) {
        dispatch(setAuth({ accessToken: data.accessToken, userId: data.id }));
        toasterSuccess("Registration successful", 1000, "id");
      } else {
        console.log("Login failed", error);
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
