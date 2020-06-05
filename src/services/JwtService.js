const jwt = require("jsonwebtoken");

const secreteKey = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRE_IN;

class JwtService {
  constructor() {}

  createToken = payload => {
    return jwt.sign(payload, secreteKey, { expiresIn });
  };

  verifyToken = token => {
    return jwt.verify(token, secreteKey, (err, decode) => {
      if (decode !== undefined) {
        return decode;
      }

      throw err;
    });
  };
}

export default JwtService;
