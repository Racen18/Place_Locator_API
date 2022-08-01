const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_OWNER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_LANGUAGE,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
})

module.exports = sequelize