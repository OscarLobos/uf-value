const User = require("../models/User");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res, next) => {
  const { username, password: pass } = req.body;

  const user = await User.findOne({ where: { username: req.body?.username } });

  if (!user) return res.status(401).send(`user don't exists!`);

  const { password, ...userData } = user;

  const isMatch = await bcrypt.compare(pass, password);

  if (!isMatch) return res.status(401).send("wrong password!");

  const userToken = { username: user?.username.toString() };
  const secretKey = process.env.SECRET_JWT || "elmaximosecreto";
  const token = jsonWebToken.sign(userToken, secretKey, { expiresIn: "9h" });

  res
    .cookie(`cookieToken`, token, { httpOnly: true, SameSite: "NONE" })
    .status(200)
    .send({ user: userData, message: "logged in" });
};

exports.logout = (req, res, next) => {
  return res.clearCookie("cookieToken").status(200).json({ message: `logout` });
};

exports.store = async (req, res, next) => {
  await hashPassword(req);
  const { ...data } = req.body;
  await User.create({ ...data })
    .then(res.status(201).send("created"))
    .catch((error) => console.error(error));
};

const hashPassword = async (req) => {
  if (req.body.password)
    req.body.password = await bcrypt.hash(req.body.password, 8);
};
