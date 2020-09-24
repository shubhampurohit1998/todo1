const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (
      ![
        "jarvis@mailinator.com",
        "friday@mailinator.com",
        "george@gmail.com",
      ].includes(values.email)
    ) {
      throw { email: "Email is not registered" };
    }
  });
};

export default asyncValidate;
