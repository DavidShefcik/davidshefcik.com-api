/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const { Schema } = require("mongoose");

/* Schema */
const ProjectSchema = new Schema({
  "id": Number,
  "name": String,
  "description": String,
  "technology": [
    {
      type: String
    }
  ],
  "openSource": Boolean,
  "repositoryURL": String,
  "live": Boolean,
  "liveURL": String,
  "authors": [
    {
      "id": Number,
      "name": String,
      "github": String
    }
  ]
});

/* Export */
module.exports = ProjectSchema;