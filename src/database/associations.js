const { Users } = require("../models/user.model");
const { Gifts } = require("../models/gift.model");
const { Lists } = require("../models/list.model");
const { GiftList } = require("../models/giftList.model");

// gifts have one user, users have many gifts
Users.hasMany(Gifts, { foreignKey: "user_id", as: "gifts" });
Gifts.belongsTo(Users, { foreignKey: "user_id", as: "user" });

// Users have many lists, lists have one user
Users.hasMany(Lists, { foreignKey: "user_id", as: "lists" });
Lists.belongsTo(Users, { foreignKey: "user_id", as: "user" });

// lists have many gifts, gifts have many lists
Lists.belongsToMany(Gifts, { through: GiftList, foreignKey: 'list_id', otherKey: 'gift_id', as: 'gifts' });
Gifts.belongsToMany(Lists, { through: GiftList, foreignKey: 'gift_id', otherKey: 'list_id', as: 'lists' });

module.exports = { Users, Gifts, Lists, GiftList };
