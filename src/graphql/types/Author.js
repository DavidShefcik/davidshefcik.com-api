/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

/* Type */
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Represents a project author.",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "The ID of the author."
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the author."
    },
    github: {
      type: GraphQLString,
      description: "An optional string for the author's GitHub profile."
    }
  })
});

/* Export */
module.exports = AuthorType;