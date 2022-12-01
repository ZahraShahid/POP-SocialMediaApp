const userModel = require("../../models/User");

module.exports = {
  Mutation: {
    
    // register(parent, args, context, info){} // Four required params - parent: Input from lasts step, args: inputs by user, context, info: metadata

    register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate User Data
      // Check for existing User with the same email
      // Hash password and create auth token
    },
  },
};
