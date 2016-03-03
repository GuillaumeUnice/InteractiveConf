'use strict';

describe('Controller: VotesctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('Public'));

  var VotesctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotesctrlCtrl = $controller('VotesctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VotesctrlCtrl.awesomeThings.length).toBe(3);
  });
});
