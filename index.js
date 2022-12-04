const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require("mongoose");

const {MongoDB_URI} = require("./config/config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers")

// Apollo constructor requires schema definitions and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})   // To get access to the things we have passed including the header within our function
});

mongoose.connect(MongoDB_URI, {useNewUrlParser:true, useUnifiedTopology: true});
console.log("Connected to MongoDB...")

server.listen({port:5550}).then((res) =>{
    console.log(`🚀  Server running at: ${res.url}`);
});



