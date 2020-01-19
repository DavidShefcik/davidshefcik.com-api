/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const mongoose = require("mongoose"); 

// Schemas
const ProjectSchema = require("../schemas/Projects");

/* Model */
const ProjectModel = new mongoose.model("Projects", ProjectSchema);

/* Export */
module.exports = ProjectModel;