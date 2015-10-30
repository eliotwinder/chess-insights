var test = require('tape');
var FEN = require('./FEN');
var PGN = require('./PGN');
var parseMove = require('./parseMove');

var startingFen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

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
