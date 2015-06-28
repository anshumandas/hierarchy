'use strict';

angular.module('hierarchyApp')
  .directive('level', function ($compile) {
    return {
      templateUrl: 'components/hierarchy/level.html',
      restrict: 'E',
      replace: 'true',
      scope: {
        thing: '=',
        onSelect: '&',
        disabled: '=',
        selected: '=',
        items: '='
      },
      link: function (scope, element, attrs) {
        if (angular.isArray(scope.thing.children)) {
          element.append("<hierarchy things='thing.children' items='items' on-select='onSelect({thing:thing, item:item})' selected='selected'/>");
          $compile(element.contents())(scope);
        }
      }
    };
  });
