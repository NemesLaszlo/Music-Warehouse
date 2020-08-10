const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define(
  'album',
  {
    id: {
      field: 'AlbumId',
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      field: 'Title',
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
