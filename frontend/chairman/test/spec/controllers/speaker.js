'use strict';

describe('Controller: SpeakerCtrl', function () {

 var controller, question, scope, $q, note;

  beforeEach(function(){
    angular.mock.module('chairmanApp')
    angular.mock.inject(function($controller, $rootScope, _question_, _note_, _$q_){
      scope = $rootScope.$new()
      question = _question_
      note = _note_
      $q = _$q_
      controller = $controller('SpeakerCtrl', {
        $scope: scope
      })
    })
  })
  
  afterEach(function() {
  });

  describe('function: sendQuestionSpeaker', function () {

    it("should have variable scope.question", function() {   
      expect(scope.question).to.be.empty;
    })

    it("should remove variable scope.question if success", function() {   
      //initialization
      scope.question = 'test';
      expect(scope.question).to.be.equal('test');

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('addAndSendQuestionToSpeaker').once().returns(q.promise)
      scope.sendQuestionSpeaker('Ceci est une question?')
      q.resolve({ status : 1,
          title: 'Question',
          message: 'La question a été envoyé au conférencier.'})
      // execute function
      scope.$apply()
      expect(scope.question).to.be.empty;
    })
  }); // end function: sendQuestionSpeaker

  describe('function: sendNoteSpeaker', function () {

    it("should have variable scope.note", function() {   
      expect(scope.note).to.be.empty;
    })

    it("should remove variable scope.note if success", function() {   
      //initialization
      scope.note = 'test';
      expect(scope.note).to.be.equal('test');

      //mock note's service
      var q = $q.defer()  
      var mock = sinon.mock(note);
      mock.expects('sendNoteToSpeaker').once().returns(q.promise)
      scope.sendNoteSpeaker('Ceci est une note')
      q.resolve({ status : 1,
          title: 'Note',
          message: 'La note a été envoyé au conférencier.'})
      // execute function
      scope.$apply()
      expect(scope.note).to.be.empty;
    })
  }); // end function: sendNoteSpeaker

});
