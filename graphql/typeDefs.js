const gql = require("graphql-tag");

// A schema is a collection of type definitions - typedefs
// defines the shape of your queries

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
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
  }
  type Mutation {
    register(registerInput: RegisterInput): User! #takes input from the user and then use in business logic
    login(email: String!, password: String!): User!
  }
`;
