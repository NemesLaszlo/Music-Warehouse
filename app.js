const express = require('express');
const Playlist = require('./models/playlist');
// const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/playlist', (req, res) => {
  Playlist.findAll().then((playlist) => {
    res.json(playlist);
  });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
