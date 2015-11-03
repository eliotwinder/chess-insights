var PGN = require('./PGN');
var FEN = require('./FEN');
var parseMove = require('./parseMove');
var storage = {
  fenkey: {
    whiteWins: 0,
    blackWins: 0,
    moves: {
      'd4': 'newFEN'
    }
  }
};

module.exports = parseGame = function(pgnString){
  var pgn = new PGN(pgnString);
  var fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  console.log('GAME: ', pgnString);
  pgn.moveList.forEach(function(space){
    console.log('MOVE: ', space);

    var fenkey = fen.stringMinusTurn;
    
    // add the fen to storage
    if (!storage[fenkey]){
      storage[fenkey] = {
        whiteWins: 0,
        blackWins: 0,
        turns: {}
      };
    }

    // add this move's data
    
    // increase wins tally
    if (pgn.winner === 'w'){
      storage[fenkey].whiteWins++;
    } else {
      storage[fenkey].blackWins++;
    }

    // get move object
    var move = parseMove(space, fen);
    
    // change board state
    fen = FEN.makeMove(move, fen);

    // save the move to the previous boardstate
    storage[fenkey].turns[space] = fen.stringMinusTurn;

 
  });

};

var pgn = '1.d4 d5 2.Nf3 e6 3.Nc3 h6 4.e3 a6 5.Be2 Bd6 6.O-O Bd7 7.h3 Nf6 8.a3 Nc6 9.b4 b5 10.Re1 a5 11.Nxb5 axb4 12.Nxd6+ cxd6 13.a4 e5 14.dxe5 dxe5 15.Bb5 e4 16.Nd4 Rc8 17.Bd2 Qa5 18.Bxc6 Bxc6 19.Nb3 Qb6 20.a5 Qb8 21.a6 O-O 22.a7 Qb6 23.Nd4 Bd7 24.Qb1 Ra8 25.Bxb4 Rfc8 26.c3 Rxa7 27.Rxa7 Qxa7 28.Be7 Rb8 29.Qa1 Qb6 30.Nc2 Nh5 31.Nb4 Qe6 32.Bc5 Qg6 33.g4 Bxg4 34.hxg4 Qxg4+ 35.Kf1 Qf5 36.Ke2 Qg4+ 37.Kf1 Qh3+ 38.Ke2 Qf3+ 39.Kd2 Qxf2+ 40.Re2 Qf3 41.Nc6 Rc8 42.Ne5 Qf5 43.Bd4 Ng3 44.Rg2 Nf1+ 45.Ke2 Nxe3 46.Kxe3 Qh3+ 47.Kf2 Qh4+ 48.Kg1 f6 49.Ng6 Qh5 50.Ne7+ Kh7 51.Nxc8 Qf5 52.Qa7 Qf3 53.Qxg7# 1-0';

parseGame(pgn);