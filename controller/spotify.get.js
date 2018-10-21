const Request = require('request-promise-native');
const shared = require('../lib/shared');
module.exports = (request, response, next) => {
  gladys.param.getValues(['spotify_client_id', 'spotify_client_secret', 'spotify_redirect_uri'])
  .then(([spotify_client_id, spotify_client_secret, spotify_redirect_uri]) => {
    return {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: request.query.code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
      },
      json: true
    };
  })
  .then(Request.post)
  .then(({access_token, refresh_token}) => {
    shared.access_token = access_token
    return gladys.param.setValue({ name: 'spotify_refresh_token', value: refresh_token })
  })
  .then(success => response.send('success'))
  .catch(error => response.send(`SPOTIFY ERROR : ${error.toString()}`))
}