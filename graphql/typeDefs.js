const gql = require("graphql-tag");

// A schema is a collection of type definitions - typedefs
// defines the shape of your queries

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
    comments: [Comment]!
    likes:[Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment{
    id:ID!
    username: String!
    createdAt: String!
    body: String!
  }
  type Like{
    id:ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post] #Lists all the queries that a client can execute and its return type
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User! #takes input from the user and then use in business logic
    login(email: String!, password: String!): User!
    createPost(body:String!): Post!
    deletePost(postId:ID!): String!
    createComment(postId:ID!,body:String!): Post!
    deleteComment(postId:ID!, commentId:ID!): Post!
    likePost(postId:ID!): Post!
  }
`;
