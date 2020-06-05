const jwt = require("jsonwebtoken");
const fs = require("fs");

const jsonServer = require("json-server");
const router = jsonServer.router(require("../db/db.js")());

const secreteKey = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRE_IN;

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, secreteKey, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, secreteKey, (err, decode) => {
    if (decode !== undefined) return decode;

    throw err;
  });
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  var db = router.db;

  var user = db
    .get("user")
    .find({ email: email, password: password })
    .value();

  return user;
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken,
  isAuthenticated: isAuthenticated
};