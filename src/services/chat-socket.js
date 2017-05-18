import socketio from 'socket.io-client'

export default class {
  constructor (userid, encrypted = true, url = 'http://localhost:3000') {
    this.userid = userid
    this.encrypted = encrypted
    this.socket = socketio(url)
  }

  emitPublicKey (publicKey) {
    this.socket.emit('publickey', {
      publicKey,
      sender: this.userid
    })
  }

  emitMessage (message, encrypted) {
    this.socket.emit('message', {
      content: message,
      sender: this.userid,
      encrypted
    })
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

  onPublicKeyRecieved (cb) {
    this.socket.on('publickey', cb)
  }

  onMessageRecieved (cb) {
    this.socket.on('message', cb)
  }

  onNewMove (cb) {
    this.socket.on('newmove', cb)
  }

  getUserId () {
    return this.userid
  }
}
