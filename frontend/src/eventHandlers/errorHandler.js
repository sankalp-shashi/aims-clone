export const handleError = (props) => {
  console.log(props);  
  switch(props.error.response.status) {
      case 400:
        props.setError('This username or email is linked to another account.');
        break;
      case 401:
        props.setError('User was not found.');
        break;
      case 402:
        props.setError('Token not found. Ensure cookies are not blocked by your browser.');
        break;
      case 403:
        props.setError('Incorrect role selected for this user.');
        break;
      case 404:
        props.setError('OTP incorrect or expired.');
        break;
      case 405:
        props.setError('All fields are required.');
        break;
      case 406:
        props.setError('Incorrect OTP');
        break;
      case 500:
        props.setError('Server error. Please try again later.');
        break;
      default:
        props.setError('An unexpected error occurred. Please try again later.');
  }
};