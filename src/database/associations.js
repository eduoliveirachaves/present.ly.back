const { Users, Items } = require("../models");

Users.hasMany(Items, { foreignKey: "user_id", as: "items" });
Items.belongsTo(Users, { foreignKey: "user_id", as: "user" });

module.exports = { Users, Items };
