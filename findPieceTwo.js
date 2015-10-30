var FEN = require('./FEN');

var files = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7
};

var checkBlackward = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank + i][file];
    if (piece) {
      return {
        piece: piece,
        fromRank: rank + i,
        fromFile: file
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};

var checkWhiteward = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank - i][file];

    if (piece) {
      return {
        piece: piece,
        fromRank: rank - i,
        fromFile: file
      };
    } else if (piece === undefined) {
      return false
    }
  }
};

var checkLeftUp = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank + i][file - i];

    if (piece) {
      return {
        piece: piece,
        fromRank: rank + i,
        fromFile: file - i
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};

var checkLeftDown = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank - i][file - i];

    if (piece) {
      return {
        piece: piece,
        fromRank: rank - i,
        fromFile: file - i
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};


var checkRightUp = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank + i][file + i];

    if (piece) {
      return {
        piece: piece,
        fromRank: rank + i,
        fromFile: file + i
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};

var checkRightDown = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    var piece = board[rank - i][file + i];

    if (piece) {
      return {
        piece: piece,
        fromRank: rank - i,
        fromFile: file + i
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};

var checkKnights = function(space, fenobject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  var spaces = [
    board[rank + 2][file + 1],
    board[rank + 2][file - 1],
    board[rank - 2][file + 1],
    board[rank - 2][file - 1],
    board[rank + 1][file + 2],
    board[rank + 1][file - 2],    
    board[rank - 1][file + 2],
    board[rank - 1][file - 2],
  ];

  for (var i = 0; i < spaces.length; i++) {
    var space = spaces[i];

    if (space === 'N' || space === 'n') {
      return space;
    } 
  } 
  
  return false;
};


var fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

// console.log(checkWhiteward('e4', fen).piece === 'P');
// console.log(checkBlackward('e4', fen).piece === 'p');
console.log(checkLeftUp('e4', fen).fromRank === 6);
console.log(checkLeftDown('e4', fen));
console.log(checkRightUp('e4', fen));
console.log(checkRightDown('e4', fen));


var fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");













