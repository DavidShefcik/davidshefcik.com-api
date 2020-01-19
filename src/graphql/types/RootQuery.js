/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

// Mongoose
const ProjectModel = require("../../mongoose/models/Projects");

// Types
const ProjectType = require("./Projects");

/* Root Query */
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query.",
  fields: () => ({
    project: {
      type: ProjectType,
      description: "A single project found by id.",
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: async (parent, args) => {
        let project = await ProjectModel.find({id: args.id});
        return project[0];
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      description: "A list of all the projects.",
      resolve: async () => {
        return await ProjectModel.find({});
      }
    }
  })
});

/* Export */
module.exports = RootQueryType;