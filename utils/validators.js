module.exports.validateRegisterInput = (
  userhandle,
  fullname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (userhandle[0] !== "@") {
    errors.userhandle = "userhandle must start with @";
  }
  if (userhandle.trim() === "") {
    errors.userhandle = "userhandle must not be empty";
  }
  if (fullname.trim() === "") {
    errors.fullname = "fullname must not be empty";
  }
  if (email.toLowerCase().trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.toLowerCase().match(regEx)) {
      errors.email = "email must be valid email address";
    }
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "password must match";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (userhandle, password) => {
  const errors = {};
  if (userhandle.trim() === "") {
    errors.userhandle = "userhandle must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateComment = (body) => {
  const errors = {};
  if (body.trim() === "") {
    errors.body = "comment must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
