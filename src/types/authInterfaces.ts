import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  email: string;
  confirmemail: string;
  password: string;
  confirmpassword: string;
  firstname: string;
  lastname: string;
  handle: string;
  dob: string;
  location: string;
}
interface ForgotPasswordFormValues {
  email: string;
}

export interface AuthFormProps {
  type: "login" | "signup" | "forgot-password" | "reset-password";  
  initialValues: LoginFormValues | SignupFormValues |ForgotPasswordFormValues;  
  validationSchema: Yup.ObjectSchema<LoginFormValues | SignupFormValues | ForgotPasswordFormValues>; 
  onSubmit: (values: LoginFormValues | SignupFormValues | ForgotPasswordFormValues) => void | Promise<void>; 
  isLoading :boolean
}
