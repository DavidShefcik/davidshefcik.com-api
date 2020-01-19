/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const {
  GraphQLSchema
} = require("graphql");

// Types
const RootQueryType = require("../types/RootQuery");

/* Schema */
const RootSchema = new GraphQLSchema({
  query: RootQueryType
});

/* Export */
module.exports = RootSchema;