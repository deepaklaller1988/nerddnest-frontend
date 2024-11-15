import * as Yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const emailValidation = Yup.string().email("Invalid email format").required("Email is Required");

const passwordValidation = Yup.string().min(8, "Password must be at least 8 characters").matches(passwordRegex,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
  .required("Password is Required");

const confirmPasswordValidation = (fieldName: string) =>
  Yup.string().oneOf([Yup.ref(fieldName)], "Passwords must match").required("Confirm Password is Required");

export const signupValidationSchema = Yup.object({
  email: emailValidation,
  confirmemail: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Confirm Email is Required"),
  password: passwordValidation,
  confirmpassword: confirmPasswordValidation("password"),
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  handle: Yup.string().required("Handle is Required"),
  dob: Yup.string().required("Date of birth is Required"),
  location: Yup.string().notRequired(), 
  agree: Yup.bool().oneOf([true], "You must agree to the Terms of Service").required("Required"),
});


export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const forgotValidationSchema = Yup.object({
  email: emailValidation,
});

export const resetValidationSchema =Yup.object({
  email: emailValidation,
  password: passwordValidation,
  confirmpassword : confirmPasswordValidation("password"),
})
