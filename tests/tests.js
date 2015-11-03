var test = require('tape');
var modules = require('./index.js');

var PGN = modules.PGN;


// test('PGN tests',function(t) {
  var samplePgn = new PGN("1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Bg4 7.O-O Nc6 8.Be3 Nd7 9.Be2 Bxf3 10.Bxf3 e5 11.d5 Ne7 12.Be2 f5 13.f4 h6 14.Bd3 Kh7 15.Qe2 fxe4 16.Nxe4 Nf5 17.Bd2 exf4 18.Bxf4 Ne5 19.Bc2 Nd4 20.Qd2 Nxc4 21.Qf2 Rxf4 22.Qxf4 Ne2+ 23.Kh1 Nxf4  0-1");
  
//   t.plan(3);

//   t.equal(samplePgn.winner, 'black', 'gets correct winner');

//   t.deepEqual(samplePgn.pgn, [ [ 'd4', 'Nf6' ], [ 'c4', 'g6' ], [ 'Nc3', 'Bg7' ], [ 'e4', 'd6' ], [ 'Nf3', 'O-O' ], [ 'Bd3', 'Bg4' ], [ 'O-O', 'Nc6' ], [ 'Be3', 'Nd7' ], [ 'Be2', 'Bxf3' ], [ 'Bxf3', 'e5' ], [ 'd5', 'Ne7' ], [ 'Be2', 'f5' ], [ 'f4', 'h6' ], [ 'Bd3', 'Kh7' ], [ 'Qe2', 'fxe4' ], [ 'Nxe4', 'Nf5' ], [ 'Bd2', 'exf4' ], [ 'Bxf4', 'Ne5' ], [ 'Bc2', 'Nd4' ], [ 'Qd2', 'Nxc4' ], [ 'Qf2', 'Rxf4' ], [ 'Qxf4', 'Ne2+' ], [ 'Kh1', 'Nxf4' ] ])

//   var startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
//   var afterD4 = "rnbqkbnr/pppppppp/8/8/3P4/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"

//   t.equal(samplePgn.toFEN(1, 0), startingFen, 'should return a starting board when passed 0,1');
//   t.equal(samplePgn.toFEN(1, 1), afterD4, 'should be correct after E4');
// })
// test('PGN.findMovingPiece', function(t) {
//   t.plan(1);

//   var startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  
//   t.deepEquals(PGN.parseMove('d4', startingFen), {
//     piece: 'P',
//     fromSquare: [6,5],
//     toSquare: [4,3]
//   }, 'should find correct movement details for d4'
// });