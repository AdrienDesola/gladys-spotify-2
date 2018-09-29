const Request = require('request-promise-native');
const shared = require('./shared');

module.exports = ({
  spotify_client_id,
  spotify_client_secret,
  spotify_redirect_uri,
  spotify_refresh_token
}) => {
  const params = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      redirect_uri: spotify_redirect_uri,
      refresh_token: spotify_refresh_token,
      grant_type: 'refresh_token'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
    },
    json: true
  }
  return Request.post(params)
  .then(({ access_token }) => shared.access_token = access_token)
}