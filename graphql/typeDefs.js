const gql = require('graphql-tag');

// A schema is a collection of type definitions - typedefs
// defines the shape of your queries

module.exports = gql`
    type Post {
        id:ID!
        username:String!
        createdAt:String!
        body:String!
    }
    type Query {                                   
        getPosts: [Post]               #Lists all the queries that a client can execute and its return type
    }
`