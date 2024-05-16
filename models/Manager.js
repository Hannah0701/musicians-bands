const { Sequelize, sequelize } = require('../db');

// 1. Create a new model called `Manager` that will represent the person managing a `Band` has made. `Manager` can have properties of your choice, but a few you may want to add:
//     - `name`: a string
//     - `email`: a string
//     - `salary`: a number
//     - `dateHired`: a date
let Manager = sequelize.define("manager", {
       name: Sequelize.STRING,
       email: Sequelize.STRING,
       salary: Sequelize.INTEGER,
       dateHired: Sequelize.STRING
});

module.exports = { Manager };