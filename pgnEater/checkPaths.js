var FEN = require('../models').FEN;

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

  // TODO: handle taking, en passant
var checkBlackward = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = rank; i < 8; i++) {
    var piece = board[i][file];
    
    // if we're off the board, return false
    if (piece === undefined) {
      return false;
    }

    // if we found a black pawn and it's black's turn
    if (piece === 'p' && fenObject.turn === 'b'){

      // the pawn can only move from 1 space back...
      if (i - rank === 1) {
        return {
          piece: piece,
          fromRank: i,
          fromFile: file
        };
      // ... unless it's the pawn's first move
      } else if (i - rank === 2 && i === 6) {
        return {
          piece: piece,
          fromRank: i,
          fromFile: file
        };
      } else {
        return false;
      }
    }

    // if it's a king, and only 1 space away, return it
    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i - rank === 1) {
          return piece;
        } else {
          return false;
        }
      }

      return {
        piece: piece,
        fromRank: i,
        fromFile: file
      };
    }
  }

  return false;
};

var checkWhiteward = function(space, fenObject){
  
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = rank - 1; i > 0; i--) {
    var piece = board[i][file];
    
    if (piece === undefined) {
      return false;
    }
    
    // if it is a pawn, check further 
    if (piece === 'P' && fenObject.turn === 'w'){
      if (rank - i === 1) {
        return {
          piece: piece,
          fromRank: i,
          fromFile: file
        };
      } else if ( rank - i === 2 && i === 1) {
        return {
          piece: piece,
          fromRank: i,
          fromFile: file
        };
      } else {
        return false;
      }
    }

    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }

      return {
        piece: piece,
        fromRank: i,
        fromFile: file
      };
    } else if (piece === undefined) {
      return false;
    }
  }
};

var checkLeft = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 0; i < 8; i++) {
    var piece = board[rank][file -i];
    if (piece === undefined) {
      return false;
    }
    
    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }
      
      return {
        piece: piece,
        fromRank: rank,
        fromFile: file - i
      };
    } 

    if (piece === undefined) {
      return false;
    }
  }
};

var checkRight = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 0; i < 8; i++) {
    var piece = board[rank][file + i];
  
    if (piece === undefined) {
      return false;
    }
    
    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }

      return {
        piece: piece,
        fromRank: rank,
        fromFile: file + i
      };
    } 

    if (piece === undefined) {
      return false;
    }
  }
};

var checkLeftUp = function(space, fenObject){
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  for (var i = 1; i < 8; i++) {
    if (board[rank + i] === undefined) {
      return false;
    }
    var piece = board[rank + i][file - i];

    if (piece === undefined) {
      return false;
    }

    if (piece){
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }

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
    if (board[rank - i] === undefined) {
      return false;
    }

    var piece = board[rank - i][file - i];
    if (piece === undefined) {
      return false;
    }


    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }
  
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
    if (board[rank + i] === undefined) {
      return false;
    }

    var piece = board[rank + i][file + i];
    if (piece === undefined) {
      return false;
    }

    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }

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
    if (board[rank - i] === undefined) {
      return false;
    }
    var piece = board[rank - i][file + i];
    
    if (piece === undefined) {
      return false;
    }
    
    if (piece) {
      if (piece.toUpperCase() === 'K') {
        if (i === 1) {
          return piece;
        } else {
          return false;
        }
      }

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


// takes a checking function, space and a game object
// returns false if the function doesn't find the 
// color that is moving right now, returns the piece if it is 
// the correct color
var byColor = function(checkFunc, space, fenObject){
  var colorCheck;
  if (fenObject.turn === 'w'){
    colorCheck = String.prototype.toUpperCase;
  } else {
    colorCheck = String.prototype.toLowerCase;
  }

  var piece = checkFunc(space, fenObject);
  if (piece.piece){
    if (piece.piece === colorCheck.bind(piece.piece)()) {
      return piece;
    }
  }    
  return false;
};

var checkDiagonals = function(space, fenObject){

  var piece = byColor(checkLeftDown, space, fenObject);
  if (piece) {
    return piece;
  }

  var piece = byColor(checkLeftUp, space, fenObject);
  if (piece) {
    return piece;
  }

  var piece = byColor(checkRightDown, space, fenObject);
  if (piece) {
    return piece;
  }

  var piece = byColor(checkRightUp, space, fenObject);
  if (piece) {
    return piece;
  }

  return false;
};

var checkDiagonalsForPiece = function(space, fenObject, target){

  var piece = byColor(checkLeftDown, space, fenObject);
  if (piece.piece === target) {
    return piece;
  }

  var piece = byColor(checkLeftUp, space, fenObject);
  if (piece.piece === target) {
    return piece;
  }

  var piece = byColor(checkRightDown, space, fenObject);
  if (piece.piece === target) {
    return piece;
  }

  var piece = byColor(checkRightUp, space, fenObject);
  if (piece.piece === target) {
    return piece;
  }

  return false;
};

var checkAll = function(space, fenObject){
  var piece;
  // TODO: handle pawn taking
  piece = byColor(checkWhiteward, space, fenObject);
  if (['Q','q','R','r','P','p','K','k'].indexOf(piece.piece) > -1) {
    return piece;
  }

  piece = byColor(checkBlackward, space, fenObject);
  if (['Q','q','R','r','P','p','K','k'].indexOf(piece.piece) > -1) {
    return piece;
  }

  piece = byColor(checkLeft, space, fenObject);
  if (['Q','q','R','r','K','k'].indexOf(piece.piece) > -1) {
    return piece;
  }

  piece = byColor(checkRight, space, fenObject);
  if (['Q','q','R','r','K','k'].indexOf(piece.piece) > -1) {
    return piece;
  }

  piece = byColor(checkDiagonals, space, fenObject);
  if (['Q','q','R','r','K','k'].indexOf(piece.piece) > -1) {
    return piece;
  } 

  piece = byColor(checkKnights, space, fenObject);
  if (piece) {
    return piece;
  }
};

var checkPawn = function(space, fenObject){
  var find;
  if (fenObject.turn === 'w') {
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'P') {
      return find;
    }
  } else {
    find = checkBlackward(space, fenObject);
    if (find.piece === 'p') {
      return find;
    }
  }
  return false;
};

var checkKnights = function(space, fenObject){
  var board = fenObject.board;
  var toRank = space[1]*1 - 1;
  var toFile = files[space[0]];

  var spaces = [
    [toRank + 2, toFile + 1],
    [toRank + 2, toFile - 1],
    [toRank - 2, toFile + 1],
    [toRank - 2, toFile - 1],    
    [toRank + 1, toFile + 2],
    [toRank + 1, toFile - 2],
    [toRank - 1, toFile + 2],
    [toRank - 1, toFile - 2]
  ];

  var checkSpaceForKnight = function( fromRank, fromFile) {
    var rank = board[fromRank];
    if (rank) {
      var possibleSpace = rank[fromFile];
      if (possibleSpace === 'N' || possibleSpace === 'n') {
        return {
          piece: possibleSpace,
          fromRank: fromRank,
          fromFile: fromFile
        }; 
      }
    }
  };

  for (var i = 0; i < spaces.length; i++) {
    var check = checkSpaceForKnight(spaces[i][0], spaces[i][1]);
    if (check) {
      return check;
    }
  }
  
  return false;
};

var checkBishop =function(space, fenObject) {
  var find;
  
  if (fenObject.turn === 'w') {

    find = checkDiagonalsForPiece(space, fenObject, 'B');
    if (find) {
      return find;
    }
  } else {
    find = checkDiagonalsForPiece(space, fenObject, 'b');
    if (find) {
      return find;
    }
  }
  return false;
};

var checkQueen =function(space, fenObject) {
  var find;
  if (fenObject.turn === 'w') {
    find = checkDiagonalsForPiece(space, fenObject, 'Q');
    if (find) {
      return find;
    }
    
    find = checkLeft(space, fenObject);
    if (find.piece === 'Q') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'Q') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'Q') {
      return find;
    }
    
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'Q') {
      return find;
    }

  } else {
    find = checkDiagonalsForPiece(space, fenObject, 'q');
    if (find) {
      return find;
    }

    find = checkLeft(space, fenObject);
    if (find.piece === 'q') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'q') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'q') {
      return find;
    }
    
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'q') {
      return find;
    }
  }
  return false;
};

var checkKing =function(space, fenObject) {
  var find;
  if (fenObject.turn === 'w') {
    find = checkDiagonalsForPiece(space, fenObject, 'K');
    if (find.piece === 'K') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'K') {
      return find;
    }
    
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'K') {
      return find;
    }
    
    find = checkLeft(space, fenObject);
    if (find.piece === 'K') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'K') {
      return find;
    }


  } else {
    find = checkDiagonalsForPiece(space, fenObject, k);
    if (find.piece === 'k') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'k') {
      return find;
    }
    
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'k') {
      return find;
    }

    find = checkLeft(space, fenObject);
    if (find.piece === 'k') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'k') {
      return find;
    }
  }
  return false;
};

var checkRook =function(space, fenObject) {
  var find;
  if (fenObject.turn === 'w') {
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'R') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'R') {
      return find;
    }    
    find = checkLeft(space, fenObject);
    if (find.piece === 'R') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'R') {
      return find;
    }

  } else {
    find = checkWhiteward(space, fenObject);
    if (find.piece === 'r') {
      return find;
    }

    find = checkBlackward(space, fenObject);
    if (find.piece === 'r') {
      return find;
    }

    find = checkLeft(space, fenObject);
    if (find.piece === 'r') {
      return find;
    }
    
    find = checkRight(space, fenObject);
    if (find.piece === 'r') {
      return find;
    }
  }
  return false;
};

module.exports = {
  checkKnight: checkKnights,
  checkBishop: checkBishop,
  checkRook: checkRook,
  checkQueen: checkQueen,
  checkKing: checkKing,
  byColor: byColor,
  checkAll: checkAll
};
