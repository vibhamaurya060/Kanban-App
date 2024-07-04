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

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

    if (err) {
      return res.status(400).json({ message: "this is not a valid token" });
    } else {
      req.user = decoded;
      next();
    }
  });

};

module.exports = auth;
