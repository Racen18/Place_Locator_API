'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'place',
      [
        {
          place_id: 1,
          place_name: 'Tesark Technologies',
          place_latitude: 13.08872157012657,
          place_longitude: 80.17817974090576
        },
        {
          place_id: 2,
          place_name: 'Marina Beach',
          place_latitude: 13.05406135534684,
          place_longitude: 80.28327941894531
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
