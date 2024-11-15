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

export interface AuthFormProps {
  type: "login" | "signup" | "forgot-password" | "reset-password";  
  initialValues: LoginFormValues | SignupFormValues;  // Adjust this based on the form type
  validationSchema: Yup.ObjectSchema<LoginFormValues | SignupFormValues>;  // Yup validation schema type with correct form values type
  onSubmit: (values: LoginFormValues | SignupFormValues) => void | Promise<void>; // Submit handler type
}
