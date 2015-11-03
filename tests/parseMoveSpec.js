var assert = require('assert');
var should = require('should');

var FEN = require('../models').FEN;
var PGN = require('../models').PGN;
var parseMove = require('../pgnEater/parseMove');

var startingFen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

// 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Bg4 7.O-O Nc6 8.Be3 Nd7
// 9.Be2 Bxf3 10.Bxf3 e5 11.d5 Ne7 12.Be2 f5 13.f4 h6 14.Bd3 Kh7 15.Qe2 fxe4
// 16.Nxe4 Nf5 17.Bd2 exf4 18.Bxf4 Ne5 19.Bc2 Nd4 20.Qd2 Nxc4 21.Qf2 Rxf4 22.Qxf4 Ne2+
// 23.Kh1 Nxf4  0-1
// 
describe('Parse move', function(){
  describe('', function(){

    var fen = FEN.makeNewBoard();
    it('d4', function(){

      fen = fen.makeMove('d4');
      
      fen.makeString().should.equal('rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P', 'P', 0, 'P', 'P', 'P', 'P' ],
          [ 0, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 'P', 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0 ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ] ], 'board');
      fen.turn.should.equal('b', 'turn');

    });

    it('Nf6', function(){
      fen = fen.makeMove('Nf6');
      fen.makeString().should.equal('rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P', 'P', 0, 'P', 'P', 'P', 'P' ],
          [ 0, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 'P', 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 0, 0, 'n', 0, 0 ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b', 0, 'r' ] ], 'board');
      fen.turn.should.equal('w', 'turn');

    });

    it('c4', function(){
      fen = fen.makeMove('c4');
      fen.makeString().should.equal('rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P',  0 ,  0 , 'P', 'P', 'P', 'P' ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 , 'P', 'P',  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 , 'n',  0 ,  0  ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b',  0 , 'r' ] ], 'board');
      fen.turn.should.equal('b', 'turn');

    });

    it('g6', function(){
      fen = fen.makeMove('g6');
      fen.makeString().should.equal('rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P',  0 ,  0 , 'P', 'P', 'P', 'P' ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 , 'P', 'P',  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 , 'n', 'p',  0  ],
          [ 'p', 'p', 'p', 'p', 'p', 'p',  0 , 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b',  0 , 'r' ] ], 'board');
      fen.turn.should.equal('w', 'turn');

    });

    it('Nc3', function(){
      fen = fen.makeMove('Nc3');
      fen.makeString().should.equal('rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R',  0 , 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P',  0 ,  0 , 'P', 'P', 'P', 'P' ],
          [  0 ,  0 , 'N',  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 , 'P', 'P',  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 , 'n', 'p',  0  ],
          [ 'p', 'p', 'p', 'p', 'p', 'p',  0 , 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b',  0 , 'r' ] ], 'board');
      fen.turn.should.equal('b', 'turn');
    });

    it('Bg7', function(){
      fen = fen.makeMove('Bg7');
      fen.makeString().should.equal('rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R',  0 , 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P',  0 ,  0 , 'P', 'P', 'P', 'P' ],
          [  0 ,  0 , 'N',  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 , 'P', 'P',  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 , 'n', 'p',  0  ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'b', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k',  0 ,  0 , 'r' ] ], 'board');
      fen.turn.should.equal('w', 'turn');
    });

    it('e4', function(){
      fen = fen.makeMove('e4');
      fen.makeString().should.equal('rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 1');
      fen.board.should.deepEqual(
        [ [ 'R',  0 , 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P',  0 ,  0 ,  0 , 'P', 'P', 'P' ],
          [  0 ,  0 , 'N',  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 , 'P', 'P', 'P',  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0  ],
          [  0 ,  0 ,  0 ,  0 ,  0 , 'n', 'p',  0  ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'b', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k',  0 ,  0 , 'r' ] ], 'board');
      fen.turn.should.equal('b', 'turn');
    });
    // it('e4', function(){
    //   var move = parseMove('e4', FEN.makeNewBoard());

    //   fen.makeString.should.equal('rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1');
    //   fen.board.should.deep.equal(
    //     [ [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
    //       [ 'P', 'P', 'P', 0, 'P', 'P', 'P', 'P' ],
    //       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //       [ 0, 0, 0, 'P', 0, 0, 0, 0 ],
    //       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //       [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //       [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
    //       [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ] ], 'board');
    //   fen.turn.should.equal('b', 'turn');
      
    // });
  });
});

// test('parseMove d4', function(t) {
//   t.plan(5);
  
//   var e4 = parseMove('e4', startingFen);

//   t.equal( e4.piece, 'P', 'piece');
//   t.equal( e4.toRank, 3, 'toRank' );
//   t.equal( e4.toFile, 4, 'toFile' );
//   t.equal( e4.fromRank, 1, 'fromRank' );
//   t.equal( e4.fromFile, 4, 'fromFile' );
// });

// test('parseMove d4', function(t) {
//   t.plan(5);
  
//   var d4 = parseMove('d4', startingFen);

//   t.equal( d4.piece, 'P', 'piece');
//   t.equal( d4.toRank, 3, 'toRank' );
//   t.equal( d4.toFile, 3, 'toFile' );
//   t.equal( d4.fromRank, 1, 'fromRank' );
//   t.equal( d4.fromFile, 3, 'fromFile' );
// });

// test('parseMove d4', function(t) {
//   t.plan(5);
  
//   var d4 = parseMove('d4', startingFen);

//   t.equal( d4.piece, 'P', 'piece');
//   t.equal( d4.toRank, 3, 'toRank' );
//   t.equal( d4.toFile, 3, 'toFile' );
//   t.equal( d4.fromRank, 1, 'fromRank' );
//   t.equal( d4.fromFile, 3, 'fromFile' );
// });

// test('parseMove rook forward', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/8/8/8/7R w KQkq - 0 1");

//   console.log(testFEN.board);

//   var d4 = parseMove('h4', testFEN );

//   t.equal( d4.piece, 'R', 'piece');
//   t.equal( d4.toRank, 3, 'toRank' );
//   t.equal( d4.toFile, 7, 'toFile' );
//   t.equal( d4.fromRank, 0, 'fromRank' );
//   t.equal( d4.fromFile, 7, 'fromFile' );
// });

// test('parseMove bishop rightUp', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/8/8/1B6/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var d4 = parseMove('a1', testFEN );

//   t.equal( d4.piece, 'B', 'piece');
//   t.equal( d4.toRank, 0, 'toRank' );
//   t.equal( d4.toFile, 0, 'toFile' );
//   t.equal( d4.fromRank, 1, 'fromRank' );
//   t.equal( d4.fromFile, 1, 'fromFile' );
// });

// test('parseMove queen leftDown', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/8/8/1Q6/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var d4 = parseMove('h8', testFEN );

//   t.equal( d4.piece, 'Q', 'piece');
//   t.equal( d4.toRank, 7, 'toRank' );
//   t.equal( d4.toFile, 7, 'toFile' );
//   t.equal( d4.fromRank, 1, 'fromRank' );
//   t.equal( d4.fromFile, 1, 'fromFile' );
// });

// test('parseMove bishop rightDown', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/8/8/1B6/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var move = parseMove('a3', testFEN );

//   t.equal( move.piece, 'B', 'piece');
//   t.equal( move.toRank, 2, 'toRank' );
//   t.equal( move.toFile, 0, 'toFile' );
//   t.equal( move.fromRank, 1, 'fromRank' );
//   t.equal( move.fromFile, 1, 'fromFile' );
// });

// test('parseMove bishop leftUp', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/8/8/1B6/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var move = parseMove('c1', testFEN );

//   t.equal( move.piece, 'B', 'piece');
//   t.equal( move.toRank, 0, 'toRank' );
//   t.equal( move.toFile, 2, 'toFile' );
//   t.equal( move.fromRank, 1, 'fromRank' );
//   t.equal( move.fromFile, 1, 'fromFile' );
// });

// test('parseMove knight up right', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/3N4/8/8/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var move = parseMove('e6', testFEN );

//   t.equal( move.piece, 'N', 'piece');
//   t.equal( move.toRank, 5, 'toRank' );
//   t.equal( move.toFile, 4, 'toFile' );
//   t.equal( move.fromRank, 3, 'fromRank' );
//   t.equal( move.fromFile, 3, 'fromFile' );
// });

// test('parseMove knight up left', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/3N4/8/8/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var move = parseMove('c6', testFEN );

//   t.equal( move.piece, 'N', 'piece');
//   t.equal( move.toRank, 5, 'toRank' );
//   t.equal( move.toFile, 2, 'toFile' );
//   t.equal( move.fromRank, 3, 'fromRank' );
//   t.equal( move.fromFile, 3, 'fromFile' );
// });

// test('parseMove knight down left', function(t) {
//   t.plan(5);
  
//   var testFEN = new FEN("8/8/8/8/3N4/8/8/8 w KQkq - 0 1");

//   console.log(testFEN.board);

//   var move = parseMove('c6', testFEN );

//   t.equal( move.piece, 'N', 'piece');
//   t.equal( move.toRank, 5, 'toRank' );
//   t.equal( move.toFile, 2, 'toFile' );
//   t.equal( move.fromRank, 3, 'fromRank' );
//   t.equal( move.fromFile, 3, 'fromFile' );
// });
