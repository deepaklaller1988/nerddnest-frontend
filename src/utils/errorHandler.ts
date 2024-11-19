// utils/errorHandler.ts
export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ERR_EMAIL_ALREADY_EXIST':
      return 'This email is already registered. Please use a different one.';
    case 'ERR_WRONG_PASSWORD':
      return 'Wrong Password';
    case 'ERR_INVALID_CREDENTIALS':
      return 'Invalid credentials. Please check your username and password.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
