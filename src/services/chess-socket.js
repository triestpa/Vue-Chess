import socketio from 'socket.io-client'

export default class {
  constructor (userid, encrypted = true, url = 'https://stockfish.patricktriest.com') {
    this.userid = userid
    this.socket = socketio(url)
  }

  emitMove (move) {
    this.socket.emit('newmove', {
      move: move,
      sender: this.userid
    })
  }

  onNewConnection (cb) {
    this.socket.on('new connection', cb)
  }

  onConnected (cb) {
    this.socket.on('connect', cb)
  }

  onDisconnect (cb) {
    this.socket.on('disconnect', cb)
  }

  onNewMove (cb) {
    this.socket.on('newmove', cb)
  }

  getUserId () {
    return this.userid
  }
}
