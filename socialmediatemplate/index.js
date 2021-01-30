//dependencies
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
//relative ports
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs');

//server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 3000 })
}).then(res => {
    console.log(`Server Running at ${res.url}`)
})