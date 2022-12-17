const postResolver = require("./posts");
const userResolver = require("./users");
const commentResolver = require("./comments");
const likeResolver = require("./likes");

module.exports = {

  //Modifier : each time a query or mutation is returned and its return type is POST, it runs this modifier
  // parent holds the data tat comes from previous step

  Post : {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },

  // Queries : To fetch data from the server
  Query: {
    ...postResolver.Query,
  },

  // Mutations :  To modify or write server-side data
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation
  },
};
