const PostModel = require("../../models/Post");

// Resolvers define how to fetch the types defined in your schema
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await PostModel.find().sort({createdAt:-1});  // sort according to latest post
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await PostModel.findById(postId);
        if (post) {
          return post;
        } else throw new Error("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
