/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

// Types
const AuthorType = require("./Author");

/* Type */
const ProjectsType = new GraphQLObjectType({
  name: "Projects",
  description: "Represents a project.",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "The ID of the project."
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the project."
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "The description of the project."
    },
    technology: {
      type: GraphQLNonNull(GraphQLList(GraphQLString)),
      description: "A list of the technology used in a project."
    },
    openSource: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "A boolean to represent if a project is open source or not."
    },
    repositoryURL: {
      type: GraphQLString,
      description: "An optional string for a GitHub repository for a project."
    },
    live: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "A boolean to represent if a project is live or not."
    },
    liveURL: {
      type: GraphQLString,
      description: "An optional string for a live URL of a project."
    },
    authors: {
      type: GraphQLList(AuthorType),
      description: "A list of authors for a project."
    }
  })
});

/* Export */
module.exports = ProjectsType;