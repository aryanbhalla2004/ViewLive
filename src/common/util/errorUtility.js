export const getErrorMessage = (errorCode, errorMessage) => {
  switch (errorCode) {
    case 'CodeMismatchException':
      return { header: 'Invalid Code',  type: 'ERROR', form: errorMessage };
    case 'ExpiredCodeException':
      return {
        form: `The code that you entered was expired. Click the resend button to get a new code`,
        type: 'WARNING',
        header: 'Code Expired',
      };
    case 'LimitExceededException':
      return {
        form: errorMessage,
        type: 'ERROR',
        header: 'Limit Exceeded',
      };
    case 'NotAuthorizedException':
      return {
        form: errorMessage,
        type: 'ERROR',
        header: errorCode,
      };
    default:
      // Handle other error cases
      return null;
  }
};