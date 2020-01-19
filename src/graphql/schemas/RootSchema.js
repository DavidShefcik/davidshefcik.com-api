/*
* David Shefcik
*/

/* Imports */
// Modules
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

/* Schema */
const RootQueryType = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "Hello!"
      }
    })
  })
});

/* Export */
module.exports = RootQueryType;