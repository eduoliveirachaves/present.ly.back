const { Users, Items } = require("./");

Users.hasMany(Items, { foreignKey: "user_id", as: "items" });
Items.belongsTo(Users, { foreignKey: "user_id", as: "user" });

module.exports = { Users, Items };
