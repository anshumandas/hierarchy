'use strict';

describe('Directive: level', function () {

  // load the directive's module and view
  beforeEach(module('hierarchyApp'));
  beforeEach(module('components/hierarchy/level.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<level></level>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the level directive');
  }));
});
