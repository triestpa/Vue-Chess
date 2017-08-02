import axios from 'axios'

export default class {
  constructor (url = 'https://stockfish.patricktriest.com') {
    this.baseurl = url
  }

  getBestMove (fen) {
    return axios.get(`${this.baseurl}/bestmove`, { params: { fen } })
  }
}
