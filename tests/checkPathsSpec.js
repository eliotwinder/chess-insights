var assert = require('assert');
var should = require('should');

var FEN = require('../models').FEN;
var checkPaths = require('../pgnEater/checkPaths');

var fen;

describe('checkPaths', function(){
  describe('checkWhiteward', function(){

      it('should return white pawn for e4 on white\'s move', function(){
          fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

          var pathCheck = checkPaths.checkWhiteward('e4', fen);
          pathCheck.piece.should.equal('P');
          pathCheck.fromRank.should.equal(1);
          pathCheck.fromFile.should.equal(4);
      });
  });

  describe('checkBlackward', function(){
      it('should return black pawn for e5 on black\'s move', function(){
          fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1");

          var pathCheck = checkPaths.checkBlackward('e5', fen);
          pathCheck.piece.should.equal('p');
          pathCheck.fromRank.should.equal(6);
          pathCheck.fromFile.should.equal(4);
      });
  });

  describe('checkLeft', function(){
    it('should check left correctly', function(){
        fen = new FEN("8/8/p7/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1");

        var pathCheck = checkPaths.checkLeft('e6', fen);
        pathCheck.piece.should.equal('p');
        pathCheck.fromRank.should.equal(5);
        pathCheck.fromFile.should.equal(0);
    });
  });

  describe('checkRight', function(){
    it('should check right correctly', function(){
        fen = new FEN("8/8/7p/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1");

        var pathCheck = checkPaths.checkRight('e6', fen);
        pathCheck.piece.should.equal('p');
        pathCheck.fromRank.should.equal(5);
        pathCheck.fromFile.should.equal(7);
    });
  });

  describe('checkLeftUp', function(){
    it('should check leftUp correctly', function(){
      fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

      var pathCheck = checkPaths.checkLeftUp('e5', fen);
      pathCheck.piece.should.equal('p');
      pathCheck.fromRank.should.equal(6);
      pathCheck.fromFile.should.equal(2);
    });
  });

  describe('checkLeftDown', function(){
    it('should check leftDown correctly', function(){
      fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

      var pathCheck = checkPaths.checkLeftDown('e4', fen);
      pathCheck.piece.should.equal('P', 'piece');
      pathCheck.fromRank.should.equal(1, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');
    });
  });

  describe('checkRightUp', function(){
    it('should check rightUp correctly', function(){
      fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

      var pathCheck = checkPaths.checkRightUp('e5', fen);
      pathCheck.piece.should.equal('p', 'piece');
      pathCheck.fromRank.should.equal(6, 'fromRank');
      pathCheck.fromFile.should.equal(6, 'fromFile');
    });
  });

  describe('checkRightDown', function(){
    it('should check RightDown correctly', function(){
      fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

      var pathCheck = checkPaths.checkRightDown('e4', fen);
      pathCheck.piece.should.equal('P', 'piece');
      pathCheck.fromRank.should.equal(1, 'fromRank');
      pathCheck.fromFile.should.equal(6, 'fromFile');
    });
  });

  describe('checkKnights', function(){
    it('should check knights correctly', function(){
      fen = new FEN("8/8/8/8/8/2N6/8/8 w KQkq - 0 1");
      var pathCheck = checkPaths.checkKnights('b1', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('d1', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('a2', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('e2', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('a4', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('e4', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('b5', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

      pathCheck = checkPaths.checkKnights('d5', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(2, 'fromRank');
      pathCheck.fromFile.should.equal(2, 'fromFile');

    });
  });

  describe('byColor', function(){
    it('should check color correctly', function(){
      fen = new FEN("8/8/8/8/8/8/N7/8 w KQkq - 0 1");

      pathCheck = checkPaths.byColor(checkPaths.checkKnights, 'c3', fen);
      pathCheck.piece.should.equal('N', 'piece');
      pathCheck.fromRank.should.equal(1, 'fromRank');
      pathCheck.fromFile.should.equal(0, 'fromFile');
    });
  });

  describe('checkDiagonals', function(){
    it('should check diagonals correctly', function(){
      fen = new FEN("8/8/8/8/3Q4/8/8/8 w KQkq - 0 1");

      pathCheck = checkPaths.byColor(checkPaths.checkDiagonals, 'e5', fen);
      pathCheck.piece.should.equal('Q', 'piece');
      pathCheck.fromRank.should.equal(3, 'fromRank');
      pathCheck.fromFile.should.equal(3, 'fromFile');

      pathCheck = checkPaths.byColor(checkPaths.checkDiagonals, 'a1', fen);
      pathCheck.piece.should.equal('Q', 'piece');
      pathCheck.fromRank.should.equal(3, 'fromRank');
      pathCheck.fromFile.should.equal(3, 'fromFile');

      pathCheck = checkPaths.byColor(checkPaths.checkDiagonals, 'f2', fen);
      pathCheck.piece.should.equal('Q', 'piece');
      pathCheck.fromRank.should.equal(3, 'fromRank');
      pathCheck.fromFile.should.equal(3, 'fromFile');

      pathCheck = checkPaths.byColor(checkPaths.checkDiagonals, 'b6', fen);
      pathCheck.piece.should.equal('Q', 'piece');
      pathCheck.fromRank.should.equal(3, 'fromRank');
      pathCheck.fromFile.should.equal(3, 'fromFile');
    });
  });

  describe('checkAll', function(){
    it('should check for the correct color in checkAll correctly', function(){
      fen = new FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

      pathCheck = checkPaths.byColor(checkPaths.checkAll, 'e4', fen);
      pathCheck.piece.should.equal('P', 'piece');
      pathCheck.fromRank.should.equal(1, 'fromRank');
      pathCheck.fromFile.should.equal(4, 'fromFile');
    });
  });

  
});