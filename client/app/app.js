'use strict';

angular.module('hierarchyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.select',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
