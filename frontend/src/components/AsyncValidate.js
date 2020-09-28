import { baseURL } from "../utility/index";
import axios from "axios";
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

const asyncValidate = (values /*, dispatch */) => {
  const obj = {
    email: values.email,
    password1: values.password,
    password2: values.re_password,
  };
  console.log(values);
  axios
    .post(`${baseURL}/auth/registration/`, obj)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      throw { email: "Something went wrong" };
    });
};

export default asyncValidate;
