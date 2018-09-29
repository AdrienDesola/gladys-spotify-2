const music = require('./music');
module.exports = ({deviceType, state}) => {
  const service = deviceType.deviceTypeIdentifier.split(':').shift();
  switch(service){
    case 'next':
      return music.next({ deviceType })
    case 'pause':
      return music.pause({ deviceType  })
    case 'play':
      return music.play({ deviceType })
    case 'previous':
      return music.previous({ deviceType })
    case 'volume':
      return music.setVolume({ deviceType, volume: state.value })
  }
}