/*
* David Shefcik 2020
*/

/* Route */
// GET: /
module.exports = app => {
  app.get("/", (req, res) => {
    return res.status(200).send("Hello!");
  });
};