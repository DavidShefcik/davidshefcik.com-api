/*
* David Shefcik 2020
*/

/* Middleware */
module.exports = (req, res, next, token) => {
  let tokenGiven = req["headers"]["token"];
  if(tokenGiven === undefined || tokenGiven === null || tokenGiven != token) {
    return res.status(401).json({
      "code": "401",
      "message": "Unauthorized"
    });
  } else {
    next();
  }
};