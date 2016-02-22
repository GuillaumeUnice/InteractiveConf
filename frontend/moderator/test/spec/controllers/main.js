'use strict';



describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('YeomanTodoAppDemo'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have no items to start', function() {
    expect(scope.tweets.length).to.be.equal(0);
  });

  it('should add items to the list', function() {
    scope.tweet = 'test1';
    scope.addTweet();
    expect(scope.tweets.length).to.be.equal(1);
  });

  it('should del items from list', function() {
    scope.tweet = 'test1';
    scope.addTweet();
    scope.removeTweet(0);
    expect(scope.tweets.length).to.be.equal(0);
  });

});
