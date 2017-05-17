import { JSEncrypt } from 'jsencrypt'

export default class {
  constructor () {
    const keySize = 1028
    this.crypt = new JSEncrypt({default_key_size: keySize})
    this.privateKey = this.crypt.getPrivateKey()
    this.originPublicKey = this.crypt.getPublicKey()
    this.otherPublicKey = this.crypt.getPublicKey()
  }

  setPublicKey (key) {
    this.otherPublicKey = key
  }

  encrypt (content) {
    this.crypt.setKey(this.otherPublicKey)
    return this.crypt.encrypt(content)
  }

  decrypt (content) {
    this.crypt.setKey(this.privateKey)
    return this.crypt.decrypt(content)
  }

  setKey (key) {
    this.crypt.setKey(key)
  }
}
