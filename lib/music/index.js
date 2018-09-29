const SpotifyRequest = require('../SpotifyRequest');

/**
 * GLADYS
 * dt.id, dt.type, dt.unit, dt.min, dt.max, d.identifier, dt.device, d.service, d.machine, dt.identifier
 */

module.exports = {
  info: () => SpotifyRequest({ deviceType, method: 'get', url: 'https://api.spotify.com/v1/me' }),
  flushQueue: require('./music.flushQueue'),
  getCurrentTrack: require('./music.getCurrentTrack'),
  getMuted: require('./music.getCurrentTrack'),
  getPlaying: require('./music.getPlaying'),
  getPlaylists: require('./music.getPlaylists'),
  getQueue: require('./music.getQueue'),
  getVolume: require('./music.getVolume'),
  next: require('./music.next'),
  pause: require('./music.pause'),
  play: require('./music.play'),
  playPlaylist: require('./music.playPlaylist'),
  previous: require('./music.previous'),
  setMuted: args => require('./music.setVolume')({ ...args, volume: args.muted ? 0 : 100 }),
  setVolume: require('./music.setVolume'),
  stop: require('./music.pause')
}