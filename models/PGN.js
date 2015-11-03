
// HELPER FUNCTIONS
var toArr = function(string) {
  var parsed = string.split('.');
  parsed.shift();
  
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
