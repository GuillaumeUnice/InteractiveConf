'use strict';

describe('Service: PublicService', function () {

  // load the service's module
  beforeEach(module('yeomanTodoAppDemoApp'));

  // instantiate service
  var PublicService;
  beforeEach(inject(function (_PublicService_) {
    PublicService = _PublicService_;
  }));

  it('should do something', function () {
    expect(!!PublicService).toBe(true);
  });

});
