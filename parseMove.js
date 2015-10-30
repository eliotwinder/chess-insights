var FEN = require('./FEN');
var findPiece = require('./findPiece');

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

// takes a space (string, i.e. 'e4') and fenObject (new FEN(...))
// 
// returns a move:
// move = {
//  piece: 'p',
//  toRank: 3,
//  toFile: 4,
//  fromRank: 1,
//  fromFile: 4
// }

var parseMove = function(space, fenObject){
  var move = {
    piece: '',
    toRank: -1,
    toFile: -1,
    fromRank: -1,
    fromFile: -1,
  };
  var piece;
  // TODO: checking for length doesn't handle a4+
  // remove +?
  
  // handles a4
  // this is the only format with 2 characters
  if (space.length === 2) {
    piece = findPiece.findAny(space, fenObject);
  
  // handles Ba4
  } else if (space === 'O-O' || space === 'O-O-O') {
    piece.piece = space;
  } else if (space.length === 3) {
    var movingPiece = space[0];
    space = space[1] + space[2];

    if ( movingPiece === 'Q') {
      piece = findPiece.findQueen(space, fenObject);
    } else if ( movingPiece === 'K') {
      piece = findPiece.findKing(space, fenObject);
    } else if ( movingPiece === 'R') {
      piece = findPiece.findRook(space, fenObject);
    } else if ( movingPiece === 'P') {
      piece = findPiece.findPawn(space, fenObject);
    } else if ( movingPiece === 'N') {
      piece = findPiece.findKnight(space, fenObject);
    } else if ( movingPiece === 'P') {
      piece = findPiece.findPawn(space, fenObject);
    } else if ( movingPiece === 'B') {
      piece = findPiece.findBishop(space, fenObject);
    }
  } else if ( space[1] === 'x') {
    var movingPiece = space[0]
    if ( movingPiece === 'Q') {
      piece = findPiece.findQueen(space.splice(1), fenObject);
    } else if ( movingPiece === 'K') {
      piece = findPiece.findKing(space.slice(1), fenObject);
    } else if ( movingPiece === 'R') {
      piece = findPiece.findRook(space.slice(1), fenObject);
    } else if ( movingPiece === 'P') {
      piece = findPiece.findPawn(space.slice(1), fenObject);
    } else if ( movingPiece === 'N') {
      piece = findPiece.findKnight(space.slice(1), fenObject);
    } else if ( movingPiece === 'P') {
      piece = findPiece.findPawn(space.slice(1), fenObject);
    } else if ( movingPiece === 'B') {
      piece = findPiece.findBishop(space.slice(1), fenObject);
    }
  }


  move.piece = piece.piece;
  move.toRank = space[1] - 1;
  move.toFile = files[space[0]];
  move.fromRank = piece.fromSpace[0]; 
  move.fromFile = piece.fromSpace[1]; 

  // a piece is specified
  move.piece = space[0];

  // if it's black's turn, change the piece to a black piece
  if (fenObject.turn === 'b') {
    move.piece = move.piece.toLowerCase();
  }

  return move;
};

module.exports = parseMove;
