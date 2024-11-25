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
        case 'ERR_USER_NOT_FOUND' :
          return "User not Found"
        case 'ERR_ACCOUNT_NOT_VERIFIED':
          return "Check your email for the confirmation link, then visit the login page."
          case 'ERR_TOKEN_GENERATE_FAILED':
            return "Token Generated Failed"
          case "User is already activated":
          return "You can Login Direct .Your Account is Verified Already !"
          case "Verification Token is Invalid":
            return "Verification Token is Invalid"
         
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
