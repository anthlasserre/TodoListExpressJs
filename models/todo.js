const Sequelize = require('sequelize');
const db = require('../db.js')

const Todo = db.define('todo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true
    },
    message: {
     type: Sequelize.STRING
   },
    completion: {
     type: Sequelize.STRING
   },
   created: {
     type: Sequelize.STRING
   },
   updated: {
       type: Sequelize.STRING
   }
});
module.exports = Todo