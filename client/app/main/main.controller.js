'use strict';

var app = angular.module('hierarchyApp');

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});

app.controller('MainCtrl', function ($scope, $http) {

  $scope.items = {};
  var assets = {};

  $scope.onSelect = function(thing, item){
    if(thing && thing.children) {
      for(var i = 0; i<thing.children.length; i++){
        var child = thing.children[i];
        if(!assets[child.name]){
          assets[child.name] = {};
        }
        if(!assets[child.name][item.code]){
          $http.get('/api/'+child.name+'/'+thing.name+'/'+item.code).success(function(items) {
            $scope.items[child.name] = items;
            assets[child.name][item.code]=items;
          });
        } else {
          $scope.items[child.name] = assets[child.name][item.code];
        }
      }
    }
  };

  $scope.init = function(){
    $scope.selected = {};
    $http.get('/api/things').success(function(things) {
      $scope.things = things;
      for(var i = 0; i < things.length; i++) {
        var thing = things[i];
        $http.get('/api/'+thing.name).success(function(items) {
          $scope.items[thing.name] = items;
          assets[thing.name]=items;
        });
      }
    });
  }

});
