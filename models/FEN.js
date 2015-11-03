var parseMove = require('../pgnEater/parseMove');

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
    });
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
  };

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

  if (!minusTurn){
    fenString.push(' ');
    fenString.push(this.turnCount);
    fenString.push(' ');  
  
    fenString.push(this.halfTurnCount);
  }

  return fenString.join('');
};

FEN.prototype.makeMove = function(move){
  move = parseMove(move, this);
  this.board[move.toRank][move.toFile] = move.piece;
  this.board[move.fromRank][move.fromFile] = 0;
  if (this.turn === 'w') {
    this.turn = 'b';
  } else {
    this.turn = 'w';
  }

  // TODO: why does this not return if i return 'this'
  return new FEN(this.makeString());
};

FEN.makeNewBoard = function(){
  return new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
};

module.exports = FEN;

