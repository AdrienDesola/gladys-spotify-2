const SpotifyRequest = require('./SpotifyRequest');
const shared = require('./shared.js');

const authorize = require('./spotify.authorize');
const refreshToken = require('./spotify.refreshToken');

module.exports = async function init() {

    gladys.param.getValues([
        'spotify_client_id',
        'spotify_client_secret',
        'spotify_redirect_uri',
        'spotify_refresh_token'
    ])
    .then(async ([spotify_client_id, spotify_client_secret, spotify_redirect_uri, spotify_refresh_token]) => {
        
        shared.spotify_client_id = spotify_client_id;
        shared.spotify_client_secret = spotify_client_secret;
        shared.spotify_redirect_uri = spotify_redirect_uri;
        shared.spotify_refresh_token = spotify_refresh_token;

        if(!spotify_refresh_token) await authorize({ spotify_client_id, spotify_client_secret, spotify_redirect_uri })
        else await refreshToken({ spotify_client_id, spotify_client_secret, spotify_redirect_uri, spotify_refresh_token })
    })
    .then(require('./spotify.loadDevices'))
};


/**   
   
await gladys.param.setValue({name: 'spotify_client_id', value: '9531e8d35afe4d308b5c99a9b551c87f'})
await gladys.param.setValue({name: 'spotify_client_secret', value: '53f0d77ce96c432eb74ffc7f698f0e35'})
await gladys.param.setValue({name: 'spotify_redirect_uri', value: 'http://localhost:1337/spotify/'})
await gladys.param.setValue({name: 'spotify_refresh_token', value: ' '})

 */