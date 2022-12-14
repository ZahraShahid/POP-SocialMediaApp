const postModel = require("../../models/Post");
const auth = require("../../utils/auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    //using arrow function
    createComment: async (_, { postId, body }, context) => {
      const { username } = auth(context);

      if (body.trim() === "") {
        throw new UserInputError("Comment is Empty!", {
          errors: {
            body: " Comment body must not be empty!",
          },
        });
      }

      const post = await postModel.findById(postId);

      if (post) {
        // unshift to add the recent comments at the top of the array
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found!");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = auth(context);
      const post = await postModel.findById(postId);

      if (post) {
        // We find the index and then compare the comment Ids. After verifying the user, the comment is deleted

        const commentIndex = await post.comments.findIndex(
          (c) => c.id === commentId
        );

        if (post.comments[commentIndex].username === username) {

          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
          
        } else throw new AuthenticationError("Action not allowed!");
      } else {
        throw new UserInputError("Post not found!");
      }
    },
  },
};
