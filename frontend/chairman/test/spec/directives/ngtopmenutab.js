'use strict';

describe('Directive: ngTopMenuTab', function () {

  // load the directive's module
  beforeEach(module('chairmanApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-top-menu-tab></ng-top-menu-tab>');
    element = $compile(element)(scope);
    expect(element.text()).to.not.be.equal('this is the ngTopMenuTab directive');
  }));
});
