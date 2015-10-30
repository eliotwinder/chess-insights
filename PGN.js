
// HELPER FUNCTIONS
var toArr = function(string) {
  var parsed = string.split('.');
  parsed.shift()
  
  var moveList = [];
  parsed = parsed.forEach(function(turn){
    turn = turn.split(' ');
    moveList.push(turn[0]);
    moveList.push(turn[1]);
  });

  moveList.pop();
  return moveList;
};

var getWinner = function(string) {
  return string[string.length - 1]*1 ? 'b' : 'w';
};

var PGN = function(pgn) {
  this.moveList = toArr(pgn);
  this.winner = getWinner(pgn);
};

PGN.parseMove = require('./parseMove');

// given a move, return FEN notation; 
// whiteOrBlack is boolean: 0 === white
PGN.prototype.toFEN = function(turn, whiteOrBlack) {
  var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  
  if (this.pgn.length < turn) {
    return new Error('This game isn\'t that long...');
  }

  return fen;
};

module.exports = PGN;
