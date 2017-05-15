// inputs -> fen string
// outputs -> onmove, ongameover, oncapture, onstatechange

import Chessboard from '../../components/chessboard/chessboard.vue'
import Chess from 'chess.js'

export default {
  name: 'chess',
  components: {
    Chessboard
  },
  data () {
    return {
      pgn: undefined,
      side: 'white'
    }
  },
  computed: {
    game () {
      const chess = Chess()
      chess.load_pgn(this.pgn)
      return chess
    }
  },
  created () {
    const chess = this.newGame()
    chess.move('e4')
    this.pgn = chess.pgn()
  },
  methods: {
    boardChange (pgn) {
      this.pgn = pgn
    },
    newGame () {
      const chess = Chess()
      return chess
    },
    swapSides () {
      if (this.side === 'white') {
        this.side = 'black'
      } else {
        this.side = 'white'
      }
    },
    randomMove () {
      const moves = this.game.moves()
      const move = moves[Math.floor(Math.random() * (moves.length - 1))]
      this.game.move(move)
      this.pgn = this.game.pgn()
    },
    reset () {
      const chess = this.newGame()
      this.pgn = chess.pgn()
    }
  }
}
