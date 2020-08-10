const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define(
  'artist',
  {
    id: {
      field: 'ArtistId',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: 'Name',
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required!',
        },
        isAlpha: {
          args: true,
          msg: 'Name must only contains letters!',
        },
        len: {
          args: [2, 30],
          msg: 'Name must be between 2 and 30 characters!',
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
