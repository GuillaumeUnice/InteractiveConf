'use strict';

describe('Service: ResponsesService', function () {

  // load the service's module
  beforeEach(module('yeomanTodoAppDemoApp'));

  // instantiate service
  var ResponsesService;
  beforeEach(inject(function (_ResponsesService_) {
    ResponsesService = _ResponsesService_;
  }));

  it('should do something', function () {
    expect(!!ResponsesService).toBe(true);
  });

});
