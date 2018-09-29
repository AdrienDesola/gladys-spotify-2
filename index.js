module.exports = function (sails) {
  const setup = require('./lib/spotify.setup');
  const init = require('./lib/spotify.init');
  const exec = require('./lib/spotify.exec');
  
  const music = require('./lib/music/index');
  const get = require('./controller/spotify.get');
  
  const refreshToken = require('./lib/spotify.refreshToken');
const authorize = require('./lib/spotify.authorize');

  gladys.on('ready', function () {
    init();
  });
  return {
    setup,
    init,
    music,
    exec,
    refreshToken,
    authorize,
    routes: {
      after: {
        'GET /spotify': get
      }
    }
  };
};
