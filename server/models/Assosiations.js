const UFValues = require("./UFValues");
const User = require("./User");

UFValues.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(UFValues, { as: "ufvalues", foreignKey: "userId" });
