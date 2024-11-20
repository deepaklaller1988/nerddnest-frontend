export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ERR_EMAIL_ALREADY_EXIST':
      return 'Sorry, that email address is already used!';
    case 'ERR_WRONG_PASSWORD':
      return 'Wrong Password';
    case 'ERR_INVALID_CREDENTIALS':
      return 'Invalid credentials. Please check your username and password.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
