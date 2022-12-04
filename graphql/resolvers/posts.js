const PostModel = require("../../models/Post");
const auth = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server");

// Resolvers define how to fetch the types defined in your schema
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await PostModel.find().sort({ createdAt: -1 }); // sort according to latest post
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
  Mutation: {
    async createPost(_, { body }, context) {
      const user = auth(context);

      const newPost = new Post({
        body,
        user: user.id, // added user to post in postModel
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = auth(context);

      try {
        const post = await PostModel.findById(postId);
        if (user.username == post.username) {
          await post.delete();
          return "Post deleted Succesfully";
        } else {
          throw new AuthenticationError("Not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
