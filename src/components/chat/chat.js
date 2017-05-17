import Socket from '../../services/socket'
import Crypt from '../../services/crypt'

export default {
  name: 'chass',
  data () {
    return {
      draft: '',
      messages: [],
      socket: null,
      crypt: null,
      publicKey: null,
      privateKey: null,
      otherPublicKey: null
    }
  },
  created () {
    const userid = Math.floor(Math.random() * 1000)
    this.socket = new Socket(userid)
    this.crypt = new Crypt()

    this.socket.onConnected(() => this.sendPublicKey())
    this.socket.onMessageRecieved((msg) => this.recieve(msg))
    this.socket.onNewConnection(() => this.sendPublicKey())
    this.socket.onPublicKeyRecieved((key) => this.recievePublicKey(key))
    this.socket.onDisconnect(() => console.log('disconnected'))
  },
  methods: {
    sendPublicKey () {
      if (this.crypt.originPublicKey) {
        this.socket.emitPublicKey(this.crypt.originPublicKey)
      }
    },
    recievePublicKey (key) {
      if (key.sender !== this.socket.getUserId()) {
        this.crypt.setPublicKey(key.publicKey)
      }
    },
    send () {
      this.messages.push(this.draft)
      const message = this.crypt.encrypt(this.draft)
      this.socket.emitMessage(message)
      this.draft = ''
    },
    recieve (msg) {
      if (msg.sender !== this.socket.getUserId()) {
        const decryptedMsg = this.crypt.decrypt(msg.content)
        this.messages.push(decryptedMsg)
      }
    }
  }
}
