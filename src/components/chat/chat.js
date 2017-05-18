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
      encrypted: false,
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

      if (this.encrypted) {
        const encryptedMsg = this.crypt.encrypt(this.draft)
        this.socket.emitMessage(encryptedMsg, true)
      } else {
        this.socket.emitMessage(this.draft, false)
      }

      this.draft = ''
    },
    recieve (msg) {
      if (msg.sender !== this.socket.getUserId()) {
        if (msg.encrypted) {
          const decryptedMsg = this.crypt.decrypt(msg.content)
          this.messages.push(decryptedMsg)
        } else {
          this.messages.push(msg.content)
        }
      }
    }
  }
}
