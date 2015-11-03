var FEN = require('../models').FEN;
var checkPaths = require('./checkPaths');

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
  var movingPiece;
  // remove +?
  
  // handles a given space, for example a4
  // this is the only format with 2 characters
  // TODO: checking for length doesn't handle a4+
  if (space.length === 2) {
    piece = checkPaths.checkAll(space, fenObject);
  } else if (space === 'O-O' || space === 'O-O-O') {
    piece.piece = space;
  // handles if te piece is given i.e. Ba4
  } else if (space.length === 3) {
    movingPiece = space[0];
    space = space[1] + space[2];

    if ( movingPiece === 'Q') {
      piece = checkPaths.checkQueen(space, fenObject);
    } else if ( movingPiece === 'K') {
      piece = checkPaths.checkKing(space, fenObject);
    } else if ( movingPiece === 'R') {
      piece = checkPaths.checkRook(space, fenObject);
    } else if ( movingPiece === 'P') {
      piece = checkPaths.checkPawn(space, fenObject);
    } else if ( movingPiece === 'N') {
      piece = checkPaths.checkKnight(space, fenObject);
    } else if ( movingPiece === 'P') {
      piece = checkPaths.checkPawn(space, fenObject);
    } else if ( movingPiece === 'B') {      
      piece = checkPaths.checkBishop(space, fenObject);
    }
  } else if ( space[1] === 'x') {
    movingPiece = space[0];
    if ( movingPiece === 'Q') {
      piece = checkPaths.checkQueen(space.splice(1), fenObject);
    } else if ( movingPiece === 'K') {
      piece = checkPaths.checkKing(space.slice(1), fenObject);
    } else if ( movingPiece === 'R') {
      piece = checkPaths.checkRook(space.slice(1), fenObject);
    } else if ( movingPiece === 'P') {
      piece = checkPaths.checkPawn(space.slice(1), fenObject);
    } else if ( movingPiece === 'N') {
      piece = checkPaths.checkKnight(space.slice(1), fenObject);
    } else if ( movingPiece === 'P') {
      piece = checkPaths.checkPawn(space.slice(1), fenObject);
    } else if ( movingPiece === 'B') {
      piece = checkPaths.checkBishop(space.slice(1), fenObject);
    }
  }

  move.piece = piece.piece;
  move.toRank = space[1] - 1;
  move.toFile = files[space[0]];
  move.fromRank = piece.fromRank; 
  move.fromFile = piece.fromFile; 

  return move;
};

module.exports = parseMove;
