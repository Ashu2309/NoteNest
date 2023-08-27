require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretJWTtoken = process.env.SECRET_KEY;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using proper token" });
  }
  try {
    const data = jwt.verify(token, secretJWTtoken);

    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using proper token" });
  }
};

module.exports = fetchUser;
