const postModel = require("../../models/Post");

module.exports = {
  Mutation: {
    //using arrow function
    createComment: async (_, { postId, body }, context) => {},
    deleteComment: async (_, { postId, commentId }, context) => {},
  },
};
