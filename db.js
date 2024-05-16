const path = require('path');
const { Sequelize, Model } = require('sequelize');

// TODO - create the new sequelize connection
const sequelize = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, "db.sqlite")
});

module.exports = {
    sequelize,
    Sequelize
};
