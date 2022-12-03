const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const userModel = require("../../models/User");
const { SECRET_KEY } = require("../../config/config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {

    // REGISTER INPUT - Mutation
    // register(parent, args, context, info){} // Four required params - parent: Input from lasts step, args: inputs by user, context, info: metadata
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate User Data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Check for existing User with the same email
      const user_email = await userModel.findOne({ email });
      if (user_email) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: " This email is taken already",
          },
        });
      }

      // Hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new userModel({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();

      const token = generateToken(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },

    // LOGIN - Mutation
    async login(_, { email, password }, context, info) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials!";
        throw new UserInputError("Wrong Credentials!", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    }
  },
};
