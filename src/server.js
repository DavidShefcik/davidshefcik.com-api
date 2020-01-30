/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// GraphQL
const RootSchema = require("./graphql/schemas/RootSchema");

/* Mongoose */
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

/* Server */
// Init.
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema: RootSchema,
  graphiql: (process.env.NODE_ENV === "dev" ? true : false)
}));

// Generate server token to refresh repos
let token = "token";
if(process.env.NODE_ENV != "dev") {
  token = crypto.randomBytes(32).toString("hex");
}
app["token"] = token;

// Routes
const loadRoutes = (dir) => {
  fs.readdir(dir, (error, files) => {
    if(error) {
      console.log("Could not get files.");
    } else {
      files.forEach(file => {
        let filePath = path.join(dir, file);
        if(fs.lstatSync(filePath).isDirectory()) {
          loadRoutes(filePath);
        } else {
          try {
            require(filePath)(app);
            console.log(`Loaded route '${file}'.`);
          } catch(error) {
            console.log(error);
          }
        }
      });
    }
  });
};

loadRoutes(path.join(__dirname, "./routes"));

// Port
const port = process.env.PORT || 8080;

// Listen
app.listen(port, () => console.log(`Server listening on port ${process.env.PORT}. Token is '${token}'.`));