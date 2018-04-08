const Sequilize = require('sequelize');

const sequelize = new Sequilize('database','username', 'password',{
    host:'localhost',
    dialect: 'sqlite',
    storage: './database.sqlite',
})
sequelize.sync()
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize