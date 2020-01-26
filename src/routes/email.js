/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const axios = require("axios");

/* Route */
// GET: email
module.exports = app => {
  app.post("/email", async (req, res) => {
    if(req.body.captcha === null || req.body.captcha === undefined) {
      return res.status(401).json({
        "code": "401",
        "message": "Unauthorized"
      });
    } else {
      let googleResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`, {}, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
      }).catch(error => {
        return res.status(500).json({
          "code": 500,
          "message": "Google API request failed."
        });
      });
      if(googleResponse["data"]["success"]) {
        return res.status(200).json({"email": process.env.EMAIL});
      } else {
        return res.status(401).json({
          "code": "401",
          "message": "Unauthorized"
        });
      }
    }
  });
};