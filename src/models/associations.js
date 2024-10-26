const {Users, Items} = require('./');

Users.hasMany(Items, { foreignKey: 'userId', as: 'products' });
Items.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

module.exports = { Users, Items };
