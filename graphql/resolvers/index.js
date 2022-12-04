const postResolver = require("./posts");
const userResolver = require("./users");

module.exports = {
  // Queries : To fetch data from the server
  Query: {
    ...postResolver.Query,
  },

  // Mutations :  To modify or write server-side data
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation
  },
};
