var parseRank = function(rank){
  var files = rank.split('');
  var parsedRank = [];

  if(files.length < 8){
    files.forEach(function(letter){
      if (!isNaN(letter)) {
        for (var i = 0; i < letter*1; i++) {
          parsedRank.push(0);
        }
      } else {
        parsedRank.push(letter);
      }
    })
  } else {
    files.map(function(letter) {
      if (letter === '1') {
        parsedRank.push(0);
      } else {
        parsedRank.push(letter);
      }
    });
  }

  return parsedRank;
};

var parseFEN = function(fenString) {
  var fen = {
    board: [[]], // array of arrays [rank, rank, [file, file]]
    turn: '', // w or b
    castling: '', // KQkq
    enPassant: [], // target en passant square 
  }
  var parsedFen = fenString.split(' ');

  fen.board = parsedFen[0].split('/').map(function(rank){
    return parseRank(rank);
  }).reverse();

  fen.turn = parsedFen[1];
  fen.castling = parsedFen[2];
  fen.enPassant = parsedFen[3];
  fen.turnCount = parsedFen[4];
  fen.halfTurnCount = parsedFen[5];

  return fen;
};

var FEN = function(string){
  var parsed = parseFEN(string);
  this.string = string;
  this.stringMinusTurn = string.slice(0, -4);
  this.board = parsed.board;
  this.turn = parsed.turn;
  this.castling = parsed.castling;
  this.enPassant =parsed.enPassant;
  this.turnCount = parsed.turnCount;
  this.halfTurnCount = parsed.halfTurnCount;
};

// makes a fen string if minusTurn is true, it leaves off turn counts
FEN.prototype.makeString = function(minusTurn) {
  var fenString = [];

  var count = 0;
  for (var j = 7; j > -1; j--) {
    var rank = this.board[j];

    for (var i = 0; i < rank.length; i++) {
      if (rank[i] === 0) {
        count++;

        if (i === rank.length - 1) {
          fenString.push(count);
          count = 0;
        }
      } else {
        if (count > 0){
          fenString.push(count);
          count = 0
        }
        fenString.push(rank[i]);
      }
    }
    
    if (j != 0) {
      fenString.push('/');
    }
  }
  
  fenString.push(' ');

  fenString.push(this.turn);
  fenString.push(' ');

  fenString.push(this.castling);
  fenString.push(' ');

  fenString.push(this.enPassant);
  fenString.push(' ');

  if (!minusTurn){
    fenString.push(this.turnCount);
    fenString.push(' ');  
  
    fenString.push(this.halfTurnCount);
    fenString.push(' ');
  }

  console.log('fdsafdsa',fenString.join(''));
  return fenString.join('');
};

FEN.makeMove = function(move, fen){
  fen.board[move.toRank][move.toFile] = move.piece;
  fen.board[move.fromRank][move.toRank] = 0;
  if (fen.turn === 'w') {
    fen.turn = 'b';
  } else {
    fen.turn = 'w';
  }
  return new FEN(fen.makeString());
};

module.exports = FEN;

