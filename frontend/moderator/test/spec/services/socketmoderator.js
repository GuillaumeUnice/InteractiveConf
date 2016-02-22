'use strict';

describe('Service: socketModerator', function () {

  // load the service's module
  beforeEach(module('Moderator'));

  // instantiate service
  var socketModerator;
  beforeEach(inject(function (_socketModerator_) {
    socketModerator = _socketModerator_;
  }));

  it('should do something', function () {
    expect(!!socketModerator).toBe(true);
  });

});
