module.exports.validateRegisterInput = (
  email,
  username,
  password,
  confirmPassword
) => {
  const errors = {}; // An object to add the errors encountered and return

  if (username.trim() === "") errors.username = "Username must not be Empty!";

  if (email.trim() === "") errors.email = "Email must not be Empty!";
  //   else {
  //     const regEx = /^[a-z0-9]+@[a-z]+.[a-z]{2,3}^/;
  //     if (!email.match(regEx)) errors.email = "Email must be a valid one!";
  //   }

  if (password === "") errors.password = "Password must not be Empty!";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match!";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === "") errors.email = "Email must not be Empty!";
  if (password === "") errors.password = "Password must not be Empty!";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
