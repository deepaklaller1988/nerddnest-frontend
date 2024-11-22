import * as Yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const emailValidation = Yup.string().email("Invalid email format").required("Email is Required");

const passwordValidation = Yup.string().min(8, "Password must be at least 8 characters").matches(passwordRegex,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
  .required("Password is Required");

  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'video/mp4',
    'video/mov',
    'video/wmv',
    'video/avi',
    'video/mpeg',
    'video/3gpp',
  ];

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
  handle: Yup.string().min(3,"Handle must be at least 3 characters").required("Handle is Required"),
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

const validateFileType = (value:any) =>
  value && typeof value === 'object' && allowedFileTypes.includes(value.type);


export const resetValidationSchema =Yup.object({
  password: passwordValidation,
  confirmpassword :confirmPasswordValidation("password")
})

export const AddStoryValidationSchema = Yup.object({
  storyCoverImage: Yup.mixed()
    .required('Story cover image is Required')
    .test(
      'fileType',
      `Unsupported file format. Allowed formats: ${allowedFileTypes.join(', ')}`,
      validateFileType
    ),
  storyCoverTitle: Yup.string()
    .required('Story cover title is Required')
    .max(100, 'Title must be less than 100 characters'),
  storyLinkText: Yup.string()
    .required('Story link text is Required')
    .max(50, 'Link text must be less than 50 characters'),
  storyLink: Yup.string()
    .url('Must be a valid URL')
    .required('Story link is Required'),
  storyMedia: Yup.mixed()
    .required('Story media is Required')
    .test(
      'fileType',
      `Unsupported file format. Allowed formats: ${allowedFileTypes.join(', ')}`,
      validateFileType
    ),
  duration: Yup.number()
    .required('Duration is Required')
    .min(1, 'Duration must be at least 1 second'),
  visibility: Yup.string()
    .oneOf(['Everyone', 'Onlyme', 'friends'], 'Invalid visibility option')
    .required('Visibility is Required'),
});