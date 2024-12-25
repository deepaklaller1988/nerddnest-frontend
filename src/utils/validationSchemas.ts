import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const emailValidation = Yup.string()
  .email("Invalid email format")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    "Invalid email format (example: username@domain.com)"
  )
  .required("Email is Required");

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(
    passwordRegex,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  )
  .required("Password is Required");

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/wmv",
  "video/avi",
  "video/mpeg",
  "video/3gpp",
];

const confirmPasswordValidation = (fieldName: string) =>
  Yup.string()
    .oneOf([Yup.ref(fieldName)], "Passwords must match")
    .required("Confirm Password is Required");

export const signupValidationSchema = Yup.object({
  email: emailValidation,
  confirmemail: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Confirm Email is Required"),
  password: passwordValidation,
  confirmpassword: confirmPasswordValidation("password"),
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  handle: Yup.string()
    .min(3, "Handle must be at least 3 characters")
    .required("Handle is Required"),
  dob: Yup.string().required("Date of birth is Required"),
  location: Yup.string().notRequired(),
  agree: Yup.bool()
    .oneOf([true], "You must agree to the Terms of Service")
    .required("Required"),
});

export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const forgotValidationSchema = Yup.object({
  email: emailValidation,
});

const validateFileType = (file: any) => {
  if (!file) return true;
  return allowedFileTypes.includes(file.type);
};
export const resetValidationSchema = Yup.object({
  password: passwordValidation,
  confirmpassword: confirmPasswordValidation("password"),
});

export const AddStoryValidationSchema = Yup.object({
  storyCoverImage: Yup.mixed()
    .required("Story cover image is required")
    .test(
      "fileType",
      `Unsupported file format. Allowed formats: ${allowedFileTypes.join(
        ", "
      )}`,
      validateFileType
    ),
  coverTitle: Yup.string()
    .required("Story cover title is required")
    .max(100, "Title must be less than 100 characters"),
  stories: Yup.array()
    .of(
      Yup.object({
        storyText: Yup.string().required('Story text is required'),

        storyLink: Yup.string()
          .url("Must be a valid URL")
          .required("Story link is required"),
        storyMedia: Yup.mixed()
          .required("Story media is required")
          .test(
            "fileType",
            `Unsupported file format. Allowed formats: ${allowedFileTypes.join(
              ", "
            )}`,
            validateFileType
          ),
        duration: Yup.number()
          .required("Duration is required")
          .min(1, "Duration must be at least 1 second"),
        visibility: Yup.string()
          .oneOf(["public", "only-me", "friends"], "Invalid visibility option")
          .required("Visibility is required"),
      })
    )
    .test("validateOrder", "Complete the first story first", function (value) {
      if (!value) return true;
      for (let i = 0; i < value.length; i++) {
        const story = value[i];
        if (!story || !story.storyText || !story.storyLink || !story.storyMedia) {
          return i === value.length - 1;
        }
      }
      return true;
    }),
});

// export const validationPostSchema = Yup.object().shape({
//   content: Yup.string()
//     .required("Content is required")
//     .min(5, "Content must be at least 5 characters"),

//   images: Yup.array()
//     .max(10, "You can only upload up to 10 images")
//     .when('type', {
//       is: (type: string) => type === 'image',  // Check 'type' field
//       then: Yup.array().required("At least one image is required"),
//       otherwise: Yup.array().notRequired(),
//     }),

//   video: Yup.array()
//     .max(10, "You can only upload up to 10 videos")
//     .when('type', {
//       is: (type: string) => type === 'video',
//       then: Yup.array().required("At least one video is required"),
//       otherwise: Yup.array().notRequired(),
//     }),

//   document: Yup.array()
//     .max(10, "You can only upload up to 10 documents")
//     .when('type', {
//       is: (type: string) => type === 'document',
//       then: Yup.array().required("At least one document is required"),
//       otherwise: Yup.array().notRequired(),
//     }),

//   gif: Yup.array()
//     .when('type', {
//       is: (type: string) => type === 'gif',
//       then: Yup.array().required("At least one gif is required"),
//       otherwise: Yup.array().notRequired(),
//     }),
// });

// export const validationPostSchema = Yup.object().shape({
//   mediaUrl: Yup.array()
//     .test('images-required', 'At least one image is required', function (value) {
//       const { type } = this.parent;
//       if (type === 'image' && (!value || value.length === 0)) {
//         return false;
//       }
//       return true;
//     })
//     .nullable(),
//   content: Yup.string()
//     .required('Write Something is required') // Basic required validation
//     .test('not-empty', 'Write Something is required', (value:any) => value && value.trim() !== ''), // No whitespace-only values
// });

export const validationPostSchema = Yup.object({
  // content: Yup.string().when('mediaUrl', {
  //   is: (mediaUrl: any) => !mediaUrl || mediaUrl.length === 0,
  //   then: Yup.string().required('Content is required if no media URL is provided.'),
  //   otherwise: Yup.string().nullable(),
  // }),
  // mediaUrl: Yup.array().nullable().when('content', {
  //   is: (content: any) => !content || content.length === 0,
  //   then: Yup.array()
  //     .min(1, 'Media URL is required if no content is provided.')
  //     .nullable(),
  //   otherwise: Yup.array().nullable(),
  // }),
});

// export const validationPostSchema = Yup.object({
//   content: Yup.string().test(
//     'content-required-if-no-mediaUrl',
//     'Content is required if no media URL is provided.',
//     function (value) {
//       const { mediaUrl } = this.parent;
//       return !!value || (Array.isArray(mediaUrl) && mediaUrl.length > 0);
//     }
//   ),
//   mediaUrl: Yup.array()
//     .nullable()
//     .test(
//       'mediaUrl-required-if-no-content',
//       'Media URL is required if no content is provided.',
//       function (value) {
//         const { content } = this.parent;
//         return (Array.isArray(value) && value.length > 0) || !!content;
//       }
//     ),
// });
