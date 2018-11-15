const SpotifyRequest = require('./SpotifyRequest');
const shared = require('./shared.js');

const authorize = require('./spotify.authorize');
const refreshToken = require('./spotify.refreshToken');

const schedule = require('node-schedule');

let cron;

module.exports = async function init() {

    gladys.param.getValue('spotify_refresh_token')
    .catch(error => gladys.param.setValue({ name: 'spotify_refresh_token', value: 'default_value' }))
    gladys.param.getValues([
        'spotify_client_id',
        'spotify_client_secret',
        'spotify_redirect_uri',
        'spotify_refresh_token'
    ])
    .then(([spotify_client_id, spotify_client_secret, spotify_redirect_uri, spotify_refresh_token]) => {
        
        shared.spotify_client_id = spotify_client_id;
        shared.spotify_client_secret = spotify_client_secret;
        shared.spotify_redirect_uri = spotify_redirect_uri;
        shared.spotify_refresh_token = spotify_refresh_token;

        if(spotify_refresh_token === 'default_value') {
            console.info('[gladys-spotify][info]', 'create a authorize link')
            return authorize({ spotify_client_id, spotify_client_secret, spotify_redirect_uri })
        }

        if(cron) cron.cancel();
        cron = schedule.scheduleJob('*/30 * * * *', function() {
            console.info('[gladys-spotify][info] cron refreshToken')
            refreshToken({ spotify_client_id, spotify_client_secret, spotify_redirect_uri, spotify_refresh_token })
        })

        console.info('[gladys-spotify][info]', 'try to refresh token')
        return refreshToken({ spotify_client_id, spotify_client_secret, spotify_redirect_uri, spotify_refresh_token })
        .catch(({error}) => {
            console.error('[gladys-spotify][error]', 'fail to refresh token')
            if(error.error === 'invalid_grant') {
                console.info('[gladys-spotify][info]', 'create a new authorize link')
                return authorize({ spotify_client_id, spotify_client_secret, spotify_redirect_uri })
            }
            return Promise.reject(error)
        })

    })
    .then(require('./spotify.loadDevices'))
    .catch(error => console.error('[gladys-spotify][error]', error.error || error.toString()))
};