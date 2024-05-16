const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { Manager } = require("./models/Manager")

//     - **Multiple musicians can be added to a band.**
//     - **Every musician has only one band.**
Band.hasMany(Musician);
Musician.belongsTo(Band);

//     - Multiple songs can be added to a Band.
//     - Multiple bands can have the same Song.
Song.belongsToMany(Band, { through: 'BandSongs'});
Band.belongsToMany(Song, { through: 'BandSongs'});

//     - A single `Band` can be added to a `Manager`
//     - A single `Manager` can be added to a `Band`.
Band.hasOne(Manager);
Manager.belongsTo(Band);

module.exports = {
    Band,
    Musician,
    Song
};
