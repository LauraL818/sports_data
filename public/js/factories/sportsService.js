(function(){
  angular.module('sportsapi',[])
    .factory('sportsService', sportsService)

    sportsService.$inject = ['$http']
    function sportsService($http){
      var service = {
        index : index
      }
      return service

      function index(){
        return $http.get('/api/stats')
      }
    }

})()
