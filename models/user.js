const Sequelize = require('sequelize');
const db = require('../db.js')

const User = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    name: {
     type: Sequelize.STRING
   },
    password: {
     type: Sequelize.STRING
   },
   team: {
    type: Sequelize.STRING
  }
});
module.exports = User