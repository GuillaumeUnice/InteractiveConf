'use strict';

describe('Directive: expander', function () {

  // load the directive's module
  beforeEach(module('YeomanTodoAppDemo'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<expander></expander>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the expander directive');
  })); 
  it('should have showMe default value equals false ', inject(function () {
    expect(scope.showMe).to.be.equal(false)
  }));
});
