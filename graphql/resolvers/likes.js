const postModel = require("../../models/Post");
const auth = require("../../utils/auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {

      const { username } = auth(context);
      const post = await postModel.findById(postId);

      if (post) {

        if (post.likes.find((like) => like.username === username)) {
          // Post has already been liked by the user
          post.likes = post.likes.filter((like) => like.username !== username);

        } else {
          // The user likes the post now
          post.likes.push({
            username: username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found!");
    },
  },
};
