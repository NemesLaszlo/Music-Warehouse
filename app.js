const express = require('express');
const bodyParser = require('body-parser');
const Playlist = require('./models/playlist');
const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 5000;
const { Op } = Sequelize;

app.use(bodyParser.json());

// Database Relations Start -----

// ----
Artist.hasMany(Album, {
  foreignKey: 'ArtistId',
});

Album.belongsTo(Artist, {
  foreignKey: 'ArtistId',
});
// ----

// ----
Playlist.belongsToMany(Track, {
  through: 'playlist_track',
  foreignKey: 'PlaylistId',
  timestamps: false,
});

Track.belongsToMany(Playlist, {
  through: 'playlist_track',
  foreignKey: 'TrackId',
  timestamps: false,
});
// ----

// Database Relations End -----

// GET Read all Playlists (?q=something options as well in url)
app.get('/api/playlists', (req, res) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`,
        },
      },
    };
  }

  Playlist.findAll(filter).then((playlists) => {
    res.json(playlists);
  });
});

// GET Read a specific Playlist by Id
app.get('/api/playlists/:id', (req, res) => {
  let { id } = req.params;

  Playlist.findByPk(id, { include: [Track] }).then((playlist) => {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send();
    }
  });
});

// GET Read a specific Track with the Playlists where this track is part of them
app.get('/api/tracks/:id', (req, res) => {
  let { id } = req.params;

  Track.findByPk(id, { include: [Playlist] }).then((track) => {
    if (track) {
      res.json(track);
    } else {
      res.status(404).send();
    }
  });
});

// GET Read a specific Artist with all Albums what its own
app.get('/api/artists/:id', (req, res) => {
  let { id } = req.params;

  Artist.findByPk(id, { include: [Album] }).then((artist) => {
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send();
    }
  });
});

// GET Read a specific Album with the Artist
app.get('/api/albums/:id', (req, res) => {
  let { id } = req.params;

  Album.findByPk(id, { include: [Artist] }).then((album) => {
    if (album) {
      res.json(album);
    } else {
      res.status(404).send();
    }
  });
});

// POST Create a Artist
app.post('/api/artists/create', (req, res) => {
  let { name } = req.body;

  Artist.create({
    name,
  }).then(
    (artist) => {
      res.json(artist);
    },
    (validation) => {
      res.status(422).json({
        errors: validation.errors.map((error) => {
          return {
            attribute: error.path,
            message: error.message,
          };
        }),
      });
    }
  );
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
