'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  place.init({
    place_name: DataTypes.STRING,
    place_latitude: DataTypes.DECIMAL,
    place_longitude: DataTypes.DECIMAL,
    place_geom: DataTypes.GEOMETRY('POINT', 4326)
  }, {
    sequelize,
    modelName: 'Place',
  });
  return place;
};