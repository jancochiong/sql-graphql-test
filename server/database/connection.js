const Sequelize = require('sequelize');

const sequelize = new Sequelize('dev', 'dev', 'dev', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

// Test Connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); 

module.exports = {
    Sequelize,
    sequelize
}