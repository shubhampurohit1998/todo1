const validate = (values) => {
  const errors = {};
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!values.email) {
    errors.email = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required!";
  } else if (!strongRegex.test(values.password)) {
    errors.password = "Password should be alphanumeric";
  }
  if (!values.re_password) {
    errors.re_password = "Required";
  } else if (!strongRegex.test(values.re_password)) {
    errors.re_password = "Password should be alphanumeric";
  } else if (values.password !== values.re_password) {
    errors.re_password = "Password should be exact same";
  }
  if (!values.user_type) {
    errors.user_type = "Must choose user type";
  }
  return errors;
};

export default validate;
