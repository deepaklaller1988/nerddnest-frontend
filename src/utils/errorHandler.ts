export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ERR_EMAIL_ALREADY_EXIST':
      return 'Sorry, that email address is already used!';
    case 'ERR_WRONG_PASSWORD':
      return 'Wrong Password';
    case 'ERR_AUTH_WRONG_USERNAME_OR_PASSWORD':
      return 'Wrong Email Id';
      case 'ERR_AUTH_WRONG_TOKEN':
        return "Token Expired"
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
