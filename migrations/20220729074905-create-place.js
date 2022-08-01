'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log(queryInterface)
    await queryInterface.createTable('places', {
      place_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};