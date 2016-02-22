'use strict';

describe('Service: inscription', function () {

  // load the service's module
  beforeEach(module('Moderator'));

  // instantiate service
  var inscription;
  beforeEach(inject(function (_inscription_) {
    inscription = _inscription_;
  }));

  it('should do something', function () {
    expect(!!inscription).toBe(true);
  });

});
