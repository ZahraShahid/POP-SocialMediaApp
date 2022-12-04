const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  // context = {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]; // token accessed using bearer

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid token!");
      }
    }
    throw new Error("Authetication token not found");
  }

  throw new Error("Authorization header must be provided");
};
