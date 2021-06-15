const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.poll = require("../models/poll.model.js")(sequelize, Sequelize);
db.answer =  require("../models/answer.model.js")(sequelize,Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// db.poll.belongsToMany(db.answer,{
//     through: "poll_answer",
//     foreignKey: "pollId",
//     otherKey: "answerId"
// });
//
// // ????
// db.answer.belongsToMany(db.poll,{
//     through: "poll_answer",
//     foreignKey: "answerId",
//     otherKey:"pollId"
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;