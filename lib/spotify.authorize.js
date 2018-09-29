module.exports = ({ spotify_client_id, spotify_redirect_uri, state=1337 }) => console.info(`https://accounts.spotify.com/authorize?
response_type=code
&client_id=${spotify_client_id}
&scope=${encodeURIComponent('user-modify-playback-state,playlist-read-private,playlist-read-collaborative,playlist-modify-public,playlist-modify-private,user-library-read,user-library-modify,user-read-private,user-read-birthdate,user-read-email,user-follow-read,user-follow-modify,user-top-read,user-read-playback-state,user-read-recently-played,user-read-currently-playing')}
&redirect_uri=${encodeURIComponent(spotify_redirect_uri)}
&state=${state}
`.toString())