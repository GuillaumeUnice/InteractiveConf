'use strict';

describe('Service: FavoritesService', function () {

  // load the service's module
  beforeEach(module('yeomanTodoAppDemoApp'));

  // instantiate service
  var FavoritesService;
  beforeEach(inject(function (_FavoritesService_) {
    FavoritesService = _FavoritesService_;
  }));

  it('should do something', function () {
    expect(!!FavoritesService).toBe(true);
  });

});
