const jwt = require("jsonwebtoken");

var tokenHandler = function () {
  self = this;
  self.secretKey = process.env.SECRET_KEY;
  if (!self.secretKey) {
    throw new Error("SECRET_KEY environment variable not set.");
  }
  return {
    create: function (payload) {
      return jwt.sign(payload, self.secretKey);
    },
    decode: function (token) {
      return jwt.verify(token, self.secretKey);
    },
  };
};

exports.tokenHandler = tokenHandler;

exports.useVerifyToken = function () {
  var handler = tokenHandler();

  return (req, res, next) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ").length != 2
    ) {
      return res.status(403).json({
        success: false,
        message: "Authentication Header not present",
      });
    }
    var token = req.headers.authorization.split(" ")[1];
    try {
      req.user = handler.decode(token);
    } catch (err) {
      return res.status(402).json({
        success: false,
        message: "Malformed or invalid JWT",
      });
    }
    next();
  };
};
