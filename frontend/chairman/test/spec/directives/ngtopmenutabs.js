'use strict';

describe('Directive: ngTopMenuTabs', function () {

  // load the directive's module
  beforeEach(module('chairmanApp'));

  var element, controller,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
   element = angular.element("<ng-top-menu-tabs></ng-top-menu-tabs>")
    $compile(element)($rootScope.$new())
    $rootScope.$digest()

    controller = element.controller("ngTopMenuTabs")

    scope = element.isolateScope() || element.scope() 
  }));

  afterEach(function(){
    element.remove()
  });

  it("should have tabs an empty array in the scope", function() {   
    expect(scope.tabs).to.be.empty;

  })


  it("should have add() a function in the controller to add tab in array scope.tabs", function() {   
    expect(controller.add).to.be.a('function');
    var tab = {};
    controller.add(tab);
    expect(scope.tabs.length).to.be.equal(1);    
  })

  it("should have select() a function in the scope to display tab", function() {   
    expect(scope.select).to.be.a('function')
  })

});
