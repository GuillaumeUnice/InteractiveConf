'use strict';

describe('Controller: MainCtrl', function () {

  var controller, question, scope, $q, questionTest;

  beforeEach(function(){
    angular.mock.module('chairmanApp')
    angular.mock.inject(function($controller, $rootScope, _question_, _$q_){
      scope = $rootScope.$new()
      question = _question_
      $q = _$q_
      controller = $controller('MainCtrl', {
        $scope: scope
      })
    })

    questionTest =   {'id' :  2, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 5, 'slide_start' : 3, 'slide_stop' : 3, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'}; 

    scope.questions = [
      {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      questionTest,
      {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
    ];

    scope.questionsSpeaker = [
      {'id' :  4, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
      questionTest,
      {'id' :  5, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
    ];

  })
  
  afterEach(function() {
    scope.questions = null;
    scope.questionsSpeaker = null;
    scope.questionsMerge = null;
  });

  describe('function: sendQuestionToSpeaker', function () {

    it('should delete question send', function () {
      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('sendQuestionToSpeaker').once().returns(q.promise)
      scope.sendQuestionToSpeaker(questionTest)
      q.resolve({ status : 1,
          title: 'Question',
          message: 'La question a été envoyé au conférencier.'})
      // execute function
      scope.$apply()

      //verify result
      expect(scope.questions.length).to.be.equal(2)
      expect(scope.questions[1]).to.not.be.equal(questionTest)

    });

    it('should not delete if question send not a success', function () {
      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()
      var mock = sinon.mock(question);
      mock.expects('sendQuestionToSpeaker').once().returns(q.promise)
      scope.sendQuestionToSpeaker(questionTest)
      q.resolve({ status : 5,
          title: 'Question',
          message: 'La question a été envoyé au conférencier.'})
      // execute function
      scope.$apply()

      //verify result
      expect(scope.questions.length).to.be.equal(3)
      expect(scope.questions[1]).to.be.equal(questionTest)
    });

  }); // end function: sendQuestionToSpeaker

  describe('function: answerQuestionToPublic', function () {

    it('should delete question answered in array scope.questions', function () {
      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);
      expect(scope.questionsSpeaker.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('sendAnswerToPublic').once().returns(q.promise)
      scope.answerQuestionToPublic(questionTest)
      q.resolve({ status : 1,
          title: 'Question',
          message: 'La réponse été envoyé au public'})
      // execute function
      scope.$apply()

      //verify result
      expect(scope.questions.length).to.be.equal(2)
      expect(scope.questions[1]).to.not.be.equal(questionTest)
      expect(scope.questionsSpeaker.length).to.be.equal(3)
      expect(scope.questionsSpeaker[1]).to.be.equal(questionTest)

    });

    it('should delete question answered in array scope.questionsSpeaker', function () {
      //initialisation
      questionTest =   {'id' :  2, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 5, 'slide_start' : 3, 'slide_stop' : 3, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'}; 
      scope.questions = [
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        questionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      scope.questionsSpeaker = [
        {'id' :  4, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        questionTest,
        {'id' :  5, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);
      expect(scope.questionsSpeaker.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('sendAnswerToPublic').once().returns(q.promise)
      scope.answerQuestionToPublic(questionTest)
      q.resolve({ status : 1,
          title: 'Question',
          message: 'La réponse été envoyé au public'})
      // execute function
      scope.$apply()

      //verify result
      expect(scope.questions.length).to.be.equal(3)
      expect(scope.questions[1]).to.be.equal(questionTest)
      expect(scope.questionsSpeaker.length).to.be.equal(2)
      expect(scope.questionsSpeaker[1]).to.not.be.equal(questionTest)

    });

  }); // end function: answerQuestionToPublic

  describe('function: maskQuestionToChairman', function () {

    it('should delete question answered in array scope.questions', function () {
      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);
      expect(scope.questionsSpeaker.length).to.be.equal(3);

      // execute function
      scope.maskQuestionToChairman(questionTest)

      //verify result
      expect(scope.questions.length).to.be.equal(2)
      expect(scope.questions[1]).to.not.be.equal(questionTest)
      expect(scope.questionsSpeaker.length).to.be.equal(3)
      expect(scope.questionsSpeaker[1]).to.be.equal(questionTest)

    });

    it('should delete question answered in array scope.questionsSpeaker', function () {
      //initialisation
      questionTest =   {'id' :  2, 'name' : 'Jhon Doe', 'status_code' : 25, 'up' : 5, 'slide_start' : 3, 'slide_stop' : 3, 'content' : 'Ceci est la question 2?', 'created_at' : '21449409521'}; 
      scope.questions = [
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        questionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      scope.questionsSpeaker = [
        {'id' :  4, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        questionTest,
        {'id' :  5, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);
      expect(scope.questionsSpeaker.length).to.be.equal(3);

      // execute function
      scope.maskQuestionToChairman(questionTest)

      //verify result
      expect(scope.questions.length).to.be.equal(3)
      expect(scope.questions[1]).to.be.equal(questionTest)
      expect(scope.questionsSpeaker.length).to.be.equal(2)
      expect(scope.questionsSpeaker[1]).to.not.be.equal(questionTest)

    });

  }); // end function: maskQuestionToChairman

  describe('function: mergeQuestionToChairman', function () {

    it("should have displayOverlay a boolean in the scope initialized at false", function() {   
      expect(scope.displayOverlay).to.be.a('boolean');
      expect(scope.displayOverlay).to.be.false;
    })

    it("should have questionsMerge an empty array in the scope", function() {   
      expect([ 1, 2, 3 ]).to.be.a('array');
      expect(scope.questionsMerge).to.be.empty;
    })

    it('should change scope.displayOverlay at true', function () {
      expect(scope.displayOverlay).to.be.false;
      // execute function
      scope.mergeQuestionToChairman(questionTest)

      //verify result
      expect(scope.displayOverlay).to.be.true;
    });

    it('should delete questionTest from scope.questions', function () {
      // execute function
      scope.mergeQuestionToChairman(questionTest)

      //verify result
      expect(scope.questions.length).to.be.equal(2)
      expect(scope.questions[1]).to.not.be.equal(questionTest)
      expect(scope.questionsSpeaker.length).to.be.equal(3)
      expect(scope.questionsSpeaker[1]).to.be.equal(questionTest)

    });

    it('should add questionTest to scope.questionsMerge', function () {
      // execute function
      scope.mergeQuestionToChairman(questionTest)

      //verify result
      expect(scope.questionsMerge.length).to.be.equal(1)
      expect(scope.questionsMerge[0]).to.be.equal(questionTest)
    });


    it('should do nothing if questionTest is already the main question merged', function () {
      scope.questionsMerge = [
        questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      // execute function
      scope.mergeQuestionToChairman(questionTest)
      
      //verify result
      expect(scope.questionsMerge[0]).to.be.equal(questionTest)
      expect(scope.questionsMerge.length).to.be.equal(3)
    });

  }); // end function: mergeQuestionToChairman

  describe('function: cancelMergeQuestion', function () {

    it("should add main question merge to scope.questions", function() {
      // initialize
      scope.questionsMerge[0] = questionTest;

      // execute function
      scope.cancelMergeQuestion()
      
      //verify result
      expect(scope.questions[3]).to.be.equal(questionTest)
      expect(scope.questions.length).to.be.equal(4)
    })

  }); // end function: cancelMergeQuestion

  describe('function: validateMergeQuestion', function () {

    it("should delete all merged question in scope.questions", function() {
      // initialize
      //var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        //questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      // verify initialisation
      expect(scope.questionsMerge.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('sendMergedQuestion').once().returns(q.promise)
      scope.validateMergeQuestion()
      q.resolve({ status : 1,
          title: 'Question',
          message: 'Le merge a été effectué.'})
      // execute function
      scope.$apply()

      // verify initialisation
      console.log(scope.questions);
      expect(scope.questions.length).to.be.equal(1);
      //expect(scope.questions[0]).to.be.equal(questionTest);
      //expect(scope.questions[2].id).to.be.equal(questionTest.id);
    })

    it("should no change scope.questions if it fails", function() {
      // initialize
      scope.questionsMerge = [
        questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      // verify initialisation
      expect(scope.questionsMerge.length).to.be.equal(3);

      //mock question's service
      var q = $q.defer()  
      var mock = sinon.mock(question);
      mock.expects('sendMergedQuestion').once().returns(q.promise)
      scope.validateMergeQuestion()
      q.resolve({ status : -1,
          title: 'Question',
          message: 'Le merge a été effectué.'})
      // execute function
      scope.$apply()

      // verify initialisation
      expect(scope.questions.length).to.be.equal(3);
      expect(scope.questions[1]).to.be.equal(questionTest);
    })

  }); // end function: validateMergeQuestion

  describe('function: chooseAsMainMergeQuestion', function () {

    it("should have new main question in first position in scope.questionsMerge", function() {
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        newQuestionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      scope.chooseAsMainMergeQuestion(questionTest, scope.questionsMerge[0])

      expect(scope.questionsMerge[0]).to.be.equal(questionTest);
    })

    it("shouldn't have new main question in other position that scope.questionsMerge[0]", function() {
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        newQuestionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      scope.chooseAsMainMergeQuestion(newQuestionTest, scope.questionsMerge[0])
      scope.questionsMerge.shift(); // shift remove the first item of $scope.questionsMerge
      expect(scope.questionsMerge).to.not.include(newQuestionTest);
    })

    it("should have old main question in new main question's old position in scope.questions", function() {   
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        newQuestionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      scope.chooseAsMainMergeQuestion(questionTest, scope.questionsMerge[0])
      expect(scope.questions[1]).to.be.equal(newQuestionTest);

    })

  }); // end function: chooseAsMainMergeQuestion

  describe('function: removeToMergeQuestion', function () {

    it("shouldn't have newQuestionTest in scope.questionsMerge", function() {
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        newQuestionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      scope.removeToMergeQuestion(newQuestionTest)

      expect(scope.questionsMerge).to.not.include(newQuestionTest);
    })

  }); // end function: removeToMergeQuestion

  describe('function: addToMergeQuestion', function () {

    it("should have new question in scope.questionsMerge", function() {
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      scope.questionsMerge = [
        questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];

      scope.addToMergeQuestion(newQuestionTest)

      expect(scope.questionsMerge).to.include(newQuestionTest);
    })

    it("should do nothing change if the new question is already in scope.questionsMerge", function() {
      // initialize
      var newQuestionTest = {'id' :  10, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 7, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'};
      var oldQuestionMerge = [
        questionTest,
        {'id' :  1, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 1, 'slide_start' : null, 'slide_stop' : null, 'content' : 'La faille Hearthbleed entre t\'elle dans cette catégorie de faille?', 'created_at' : '1449409522'},
        newQuestionTest,
        {'id' :  3, 'name' : 'Jhon Doe', 'status_code' : 5, 'up' : 4, 'slide_start' : 2, 'slide_stop' : 4, 'content' : 'Ceci est la question 2?', 'created_at' : '1449409521'}
      ];
      scope.questionsMerge = oldQuestionMerge;

      scope.addToMergeQuestion(newQuestionTest)

      expect(scope.questionsMerge).to.equal(oldQuestionMerge);
    })

  }); // end function: addToMergeQuestion

});
