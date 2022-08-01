const Sequelize = require('sequelize')
const db = require('../database/db.connection')

const Place = db.define('place', {
    place_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    place_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    place_latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    place_longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    place_geom: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: false,
        unique: true
    }
});

module.exports = Place