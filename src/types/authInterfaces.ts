import * as Yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  confirmemail: string;
  password: string;
  confirmpassword: string;
  firstname: string;
  lastname: string;
  handle: string;
  dob: string;
  location?: string |undefined | null;
  agree: boolean
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResettPasswordFormValues {
  password: string;
  confirmpassword: string;
}

export type AuthFormValues =
  | LoginFormValues
  | SignupFormValues
  | ForgotPasswordFormValues
  |ResettPasswordFormValues;

export interface AuthFormProps<T extends AuthFormValues> {
  type: "login" | "signup" | "forgot-password" | "reset-password";
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  onSubmit: (values: T) => void | Promise<void>;
  // isLoading: boolean;
  isRegistered?:boolean
  isActivated?:boolean
  errorMessage?:string
  successMsg?:string
  handleResendActivationEmail?:any
  sucessActivationEmail?:any
}
