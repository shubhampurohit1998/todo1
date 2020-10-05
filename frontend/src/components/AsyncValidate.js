import { baseURL } from "../utility/index";
import axios from "axios";
import { SubmissionError } from "redux-form";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const asyncValidate = (values /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (
//       ![
//         "jarvis@mailinator.com",
//         "friday@mailinator.com",
//         "george@gmail.com",
//       ].includes(values.email)
//     ) {
//       throw { email: "Email is not registered" };
//     }
//   });
// };

const asyncValidate = (values) => {
  const user = values.user_type === "user";
  const agent = values.user_type === "agent";
  const obj = {
    email: values.email,
    password1: values.password,
    password2: values.re_password,
    is_user: values.user_type === "user" ? true : false,
    is_agent: values.user_type === "agent" ? true : false,
  };
  console.log(obj);
  axios
    .post(`${baseURL}/auth/registration/`, obj)
    .then((response) => {
      console.log(response.data);   
    })
    .catch((error) => {
      const errors = error.response.data;
      console.log(error);

      // if ("non_field_errors" in errors) {
      //   errors._error = errors.non_field_errors;
      // }
      // throw new SubmissionError(errors);
    });
};

export default asyncValidate;
