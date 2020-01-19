/*
* David Shefcik 2020
*/

/* Imports */
// dotenv
require("dotenv").config();

// Modules
const express = require("express");
const graphqlHTTP = require("express-graphql");

// GraphQL
const RootSchema = require("./graphql/schemas/RootSchema");

/* Server */
// Init.
const app = express();

// Middleware
app.use("/graphql", graphqlHTTP({
  schema: RootSchema,
  graphiql: (process.env.NODE_ENV === "dev" ? true : false)
}));

// Routes

// Listen
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}.`));