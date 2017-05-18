// inputs -> fen string
// outputs -> onmove, ongameover, oncapture, onstatechange

import Chessboard from '../../components/chessboard/chessboard.vue'
import Chat from '../../components/chat/chat.vue'
import Ai from '../../services/ai'

import Chess from 'chess.js'

export default {
  name: 'chess',
  components: {
    Chessboard,
    Chat
  },
  data () {
    return {
      pgn: undefined,
      ai: null,
      side: 'w',
      twoplayer: false,
      iconDir: 'static/icons/'
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
    this.newGame()
    this.ai = new Ai()
  },
  methods: {
    newGame () {
      const chess = Chess()
      this.pgn = chess.pgn()
    },
    boardChange (pgn) {
      this.pgn = pgn

      if (this.twoplayer) {
        setTimeout(this.swapSides, 1000)
      }

      this.ai.getBestMove(this.game).then((move) => {
        console.log(move)
        this.move(move)
      })
    },
    swapSides () {
      if (this.side === 'w') {
        this.side = 'b'
      } else {
        this.side = 'w'
      }
    },
    randomMove () {
      const moves = this.game.moves()
      const move = moves[Math.floor(Math.random() * (moves.length - 1))]
      this.game.move(move)
      this.pgn = this.game.pgn()
    },
    move (move) {
      this.game.move(move)
      this.pgn = this.game.pgn()
    },
    reset () {
      const chess = this.newGame()
      this.pgn = chess.pgn()
    }
  }
}
