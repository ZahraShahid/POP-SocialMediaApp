const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require("mongoose");

const {MongoDB_URI} = require("./config/config")


// A schema is a collection of type definitions - typedefs
// defines the shape of your queries
const typeDefs = gql`
    type Query {               #Lists all the queries that a client can execute and its return type
        printMessage: String!  #Recommended - !
    }
`;


// Resolvers define how to fetch the types defined in your schema
const resolvers = {
    Query : {
        printMessage: () => "Hello World!"
    }
    // Mutations : {
    // }
};


// Apollo constructor requires schema definitions and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MongoDB_URI, {useNewUrlParser:true, useUnifiedTopology: true});
console.log("Connected to MongoDB...")

server.listen({port:5000}).then((res) =>{
    console.log(`🚀  Server running at: ${res.url}`);
});



