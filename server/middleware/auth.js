const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = () => {
  return async function (req, res, next) {
    let token = req.cookies.accessToken;

    if (!token) {
      return res.sendStatus(403);
    }

    try {
      const secretKey = process.env.SECRET_JWT || "";
      const decoded = jwt.verify(token, secretKey);

      const user = await User.findOne(
        { where: { username: decoded.username } },
        {
          attributes: { exclude: ["password"] },
        }
      );
      if (!user) throw new HttpException(401, "Not Authorized!");

      req.currentUser = user; // usuario actual

      return next();
    } catch (error) {
      error.status = 401;
      next(error);
    }
  };
};

module.exports = auth;
