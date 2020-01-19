/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const axios = require("axios");

/* Axios config */
module.exports = axios.create({
  baseURL: "https://api.github.com",
  timeout: 5000,
  headers: {
    "Authorization": `token ${process.env.GITHUB_TOKEN}`,
    "Accept": "application/vnd.github.v3+json"
  }
});