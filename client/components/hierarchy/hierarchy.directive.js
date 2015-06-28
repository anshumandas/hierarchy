'use strict';

angular.module('hierarchyApp')
  .directive('hierarchy', function ($compile) {
    return {
      templateUrl: 'components/hierarchy/hierarchy.html',
      restrict: 'E',
      replace: 'true',
      scope: {
        things: '=',
        onSelect: '&',
        disabled: '=',
        selected: '=',
        items: '='
      },
      link: function (scope, element, attrs) {
        if(scope.things && scope.things.children){
          console.log(scope.things.children);
        }
        $compile(element.contents())(scope);
      }
    };
  });
