const UFValues = require("../models/UFValues");
const User = require("../models/User");

exports.getAll = async (req, res, next) => {
  await UFValues.findAll({
    include: { model: User, as: "user", attributes: { exclude: ["id"] } },
    order: [["id", "desc"]],
  })
    .then((data) => res.status(200).send(data))
    .catch((error) => console.error(error));
};

exports.store = async (req, res, next) => {
  const { body } = req;
  console.log(body);

  await UFValues.create({ ...body })
    .then((data) => res.status(201).send("created"))
    .catch((error) => console.error(error));
};
