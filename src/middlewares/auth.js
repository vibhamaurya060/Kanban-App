var jwt = require("jsonwebtoken");
require('dotenv').config()
const auth = async (req, res, next) => {

  
  const token = req.session.token;
  console.log(req.session)

  if (!token) {
    return res.status(400).json({
      message: "token  is not present or token is not provided",
    });
  }

  // const token = req.headers.authorization.split(" ")[1];

  //here we have to check if this particular token is blacklisted or not.
  // const blacklistToken = await blacklistModel.findOne({ token });
  // if (blacklistToken) {
  //   return res.status(400).json({
  //     message: "this token is blacklisted try to get the new token",
  //   });
  // }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    // console.log(decoded) // bar
    if (err) {
      return res.status(400).json({ message: "this is not a valid token" });
    } else {
      req.user = decoded;
      next();
    }
  });

  // we have to get the token
  // const token =
};

module.exports = auth;
