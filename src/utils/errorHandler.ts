// utils/errorHandler.ts
export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ERR_ALREADY_REGISTER':
      return 'This email is already registered. Please use a different one.';
    case 'ERR_INTERNAL_SERVER':
      return 'Internal server error. Please try again later.';
    case 'ERR_INVALID_CREDENTIALS':
      return 'Invalid credentials. Please check your username and password.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
