angular.module('sports', ['ui.router','sportsapi'])
  .config(['$stateProvider', '$urlRouterProvider', mainRouter])

  ////////////////////////UI ROUTER STATES///////////////////////
    function mainRouter($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('table', {
        url:'/',
        templateUrl:'partials/table.html',
        controller:'MainController as main'
      })
      .state('chart', {
        url:'/chart',
        templateUrl:'partials/d3.html',
        controller:'MainController as main'
      })
    }
