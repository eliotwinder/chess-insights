// takes  a apace and fenObject 
// space = 'd4' // string
// fenObject = new FEN();
// 
// returns the piece that moved to that space 
// piece =  {
//  piece: 'P',
//  fromSpace: [rank, file]
// }
// 

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

var isWhite = function(piece) {
  if (piece === undefined) {
    throw new Error('no piece');
  }
  if (piece.toUpperCase() === piece) {
    return true;
  } else {
    return false;
  }
};

var checkBackward = function(space, fenObject, targetPiece) {
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];
  // track how many squares back we are
  var count = 0; 
  
  var pawn, queen, king, rook;

  if (fenObject.turn === 'w') {
    pawn = 'P';
    queen = 'Q';
    king = 'K';
    rook = 'R';
  } else {
    pawn = 'p';
    queen = 'q';
    king = 'k';
    rook = 'r';
  }

  if (targetPiece === 'P' || targetPiece === 'p') {
    queen = 'na';
    king = 'na';
    rook = 'na'; 
  }

  if (targetPiece === 'Q' || targetPiece === 'q') {
    pawn = 'na';
    king = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'K' || targetPiece === 'k') {
    pawn = 'na';
    queen = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'R' || targetPiece === 'r') {
    pawn = 'na';
    queen = 'na';
    king = 'na'; 
  }

  // working backwards from the pawn
  for (var i = rank - 1; i >= 0; i--) {
    var piece = board[i][file] 
    count++;

    console.log(piece)

    // if the space is occupied
    if (piece) {
      if (count === 1) {
        // if it is one of these pieces that could have moved one space forward
        if (piece === pawn || 
          piece === queen || 
          piece === king ||
          piece === rook
          ) {
          return {
            piece: piece,
            fromSpace: [i, file]
          };
        }
      // if we are two spaces back 
      } else if (count === 2) {
        // check for P moving two, Q, R
        if ( 
          (piece === pawn && rank === 3) ||
          piece === queen || 
          piece === rook
          ) {
          return {
            piece: piece,
            fromSpace: [ i, file]
          };
        } 
      } else {
        if ( piece === queen || piece === rook ) {
          return {
            piece: piece,
            fromSpace: [ i, file]
          };
        } else {
          return false;
        }
      }
    }
  }
  return false;
};

var checkForward = function(space, fenObject, targetPiece) {
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];
  var count = 0;

  var pawn, queen, king, rook;

  if (fenObject.turn === 'w') {
    queen = 'Q';
    king = 'K';
    rook = 'R';
  } else {
    queen = 'q';
    king = 'k';
    rook = 'r';
  }

  if (targetPiece === 'Q' || targetPiece === 'q') {
    king = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'K' || targetPiece === 'k') {
    queen = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'R' || targetPiece === 'r') {
    queen = 'na';
    king = 'na'; 
  }

  for (var i = rank + 1; i < 8; i++){  
    var piece = board[i][file]; 
    count++;

    // if there's a piece
    if (piece) {
      if (
        piece === queen || 
        piece === rook ||
        (piece === king && count === 1)
      ) {
        return {
          piece: piece,
          fromSpace: [i, file]
        }; 
      } else {
        return false;
      }
    }
  }

  return false;
};

var checkSideways = function(space, fenObject, targetPiece) {
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];
  var count = 0;

  var queen, king, rook;

  if (fenObject.turn === 'w') {
    queen = 'Q';
    king = 'K';
    rook = 'R';
  } else {
    queen = 'q';
    king = 'k';
    rook = 'r';
  }

  if (targetPiece === 'Q' || targetPiece === 'q') {
    king = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'K' || targetPiece === 'k') {
    queen = 'na';
    rook = 'na'; 
  }  

  if (targetPiece === 'R' || targetPiece === 'r') {
    queen = 'na';
    king = 'na'; 
  }
  
  var leftPossible = true;
  var rightPossible = true;

  for (var i = 1; i < 8; i++){  
    count++;
    
    // handle left
    var leftPiece = board[rank][file - i];
    
    if (leftPiece && leftPossible) {
      if (
        piece === queen || 
        piece === rook ||
        (piece === king && count === 1)
      ) {
        return {
          piece: piece,
          fromSpace: [i, file - i ]
        }; 
      } else {
        leftPossible = false;
      } 
    }

    // handle right
    var rightPiece = board[rank][file + i];
    
    if (rightPiece && rightPossible) {
      if (
        piece === queen || 
        piece === rook ||
        (piece === king && count === 1)
      ) {
        return {
          piece: piece,
          fromSpace: [rank, file + i ]
        }; 
      } else {
        rightPossible = false;
      } 
    }

    if (!rightPossible && !leftPossible) {
      return false;
    }
  }

  return false;
}

var checkDiagonal = function(space, fenObject, piece) {
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  var rightUpPiece;
  var leftDownPiece;
  var rightDownPiece;
  var leftUpPiece

  var rightUpPossible = true;
  var leftDownPossible = true;
  var rightDownPossible = true;
  var leftUpPossible = true;

  if (fenObject.turn === 'w') {
    queen = 'Q';
    bishop = 'B';
    king = 'K';
  } else {
    queen = 'q';
    bishop = 'b';
    king = 'k';
  }

  if (piece === 'Q' || piece === 'q') {
    bishop = 'na';
    king = 'na';
  }

  if (piece === 'B' || piece === 'b') {
    king = 'na';
    queen = 'na';
  }

  if (piece === 'K' || piece === 'k') {
    bishop = 'na';
    queen = 'na';
  }

  for (var i = 0; i < 8; i++) {
    // check if valid space for rightUpPiece
    if (rank + i < 8 && file + i < 8){
      rightUpPiece = board[rank + i][file + i];
    } else {
      rightUpPossible = false;
    }    

    // check if valid space for leftDownPiece
    if (rank - i > -1 && file - i > -1){
      leftDownPiece = board[rank - i][file - i];
    } else {
      leftDownPossible = false;
    }
    
    // check if valid space for rightDownPiece
    if (rank - i > -1 && file + i < 8){
      rightDownPiece = board[rank - i][file + i];
    } else {
      rightDownPossible = false;
    }
    // check if valid space for leftUpPiece
    if (rank + i < 8 && file - i > -1){
      leftUpPiece = board[rank + i][file - i];
    } else {
      leftUpPossible = false;
    }

    // handle right up
    if (rightUpPossible && rightUpPiece) {
      if (
        rightUpPiece === queen ||
        rightUpPiece === bishop ||
        (rightUpPiece === king && count === 1)
        ) {

        return {
          piece: rightUpPiece,
          fromSpace: [rank + i, file + i]
        };
      } else {
        rightUpPossible = false;
      }
    }

    // handle left down
    if (leftDownPossible && leftDownPiece) {
      if (
        leftDownPiece === queen ||
        leftDownPiece === bishop ||
        (leftDownPiece === king && count === 1)
        ) {
        return {
          piece: leftDownPiece,
          fromSpace: [rank - i, file - i]
        };
      } else {
        leftDownPossible = false;
      }
    }

    // handle right down
    if (rightDownPossible && rightDownPiece) {
      if (
        rightDownPiece === queen ||
        rightDownPiece === bishop ||
        (rightDownPiece === king && count === 1)
        ) {
        return {
          piece: rightDownPiece,
          fromSpace: [rank - i, file + i]
        };
      } else {
        rightDownPossible = false;
      }
    }

    // handle left up
    if (leftUpPossible && leftUpPiece) {
      if (
        leftUpPiece === queen ||
        leftUpPiece === bishop ||
        (leftUpPiece === king && count === 1)
        ) {
        return {
          piece: leftUpPiece,
          fromSpace: [rank + i, file - i]
        };
      } else {
        leftUpPossible = false;
      }
    }

    // base case - if neither is possible, return false
    if (!rightUpPossible && !leftDownPossible && !rightDownPossible && ! leftUpPossible) {
      return false;
    } 
  }
};

var checkKnight = function(space, fenObject) {
  var board = fenObject.board;
  var rank = space[1]*1 - 1;
  var file = files[space[0]];

  var knight;
  if (fenObject.turn === 'w') {
    knight = 'N';
  } else {
    knight = 'n';
  }

  if (board[rank + 2]){    
    if (board[rank + 2][file + 1] === knight) {
      return {
        piece: knight,
        fromSpace: [rank + 2, file + 1]
      };
    } 

    if (board[rank + 2][file - 1] === knight) {
      return {
        piece: board[rank + 2][file - 1],
        fromSpace: [rank + 2, file - 1]
      };
    }
  }

  if (board[rank - 2]) {
    if (board[rank - 2][file + 1] === knight) {
      return {
        piece: board[rank - 2][file + 1],
        fromSpace: [rank - 2, file + 1]
      };
    } 

    if (board[rank - 2][file - 1] === knight) {
      return {
        piece: board[rank - 2][file - 1],
        fromSpace: [rank - 2, file - 1]
      };
    }
  }

  if (board[rank + 1]) {
    if (board[rank + 1][file + 2] === knight) {
      return {
        piece: board[rank + 1][file + 2],
        fromSpace: [rank + 1, file + 2]
      };
    }
  
    if (board[rank + 1][file - 2] === knight) {
      return {
        piece: board[rank + 1][file - 2],
        fromSpace: [rank + 1, file - 2]
      };
    }
  }

  if (board[rank -1]){
    if (board[rank - 1][file + 2] === knight) {
      return {
        piece: board[rank - 1][file + 2],
        fromSpace: [rank - 1, file + 2]
      };
    }
  
    if (board[rank - 1][file - 2] === knight) {
      return {
        piece: board[rank - 1][file - 2],
        fromSpace: [rank - 1, file - 2]
      };
    }
  }

  return false;   
};

var checkAll = function(space, fenObject){
  var backward = checkBackward(space, fenObject);
  if (backward) return backward;
  
  var forward = checkForward(space, fenObject);
  if (forward) return forward;

  var sideways = checkSideways(space, fenObject);
  if (sideways) return sideways;

  var diagonal = checkDiagonal(space, fenObject);
  if (diagonal) return diagonal;

  var knight = checkKnight(space, fenObject);
  if (knight) return knight;

  // this should never happen
  console.log('no piece found findPiece 458')
  return false;
};

var findBishop = function(space, fenObject) {
  return checkDiagonal(space, fenObject, 'B');
};

var findQueen = function(space, fenObject) {
  var diagonal = checkDiagonal(space, fenObject, 'Q');
  if (diagonal) return diagonal;

  var backward = checkBackward(space, fenObject, 'Q');
  if (backward) return backward;

  var foreward = checkForward(space, fenObject, 'Q');
  if (foreward) return foreward;

  var sideways = checkSideways(space, fenObject, 'Q');
  if (sideways) return sideways;
};

var findKing = function(space, fenObject) {
  var diagonal = checkDiagonal(space, fenObject, 'K');
  if (diagonal) return diagonal;

  var backward = checkBackward(space, fenObject, 'K');
  if (backward) return backward;

  var foreward = checkForward(space, fenObject, 'K');
  if (foreward) return foreward;

  var sideways = checkSideways(space, fenObject, 'K');
  if (sideways) return sideways;
};

var findRook = function(space, fenObject) {
  var backward = checkBackward(space, fenObject, 'R');
  if (backward) return backward;

  var foreward = checkForward(space, fenObject, 'R');
  if (foreward) return foreward;

  var sideways = checkSideways(space, fenObject, 'R');
  if (sideways) return sideways;
};

var findPawn = function(space, fenObject) {
  return checkBackward(space, fenObject, 'P');
}


module.exports = {
  findAny: checkAll,
  findKnight: checkKnight,
  findBishop: findBishop,
  findQueen: findQueen,
  findKing: findKing,
  findRook: findRook,
  findPawn: findPawn 
};
