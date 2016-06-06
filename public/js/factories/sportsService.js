(function(){
  angular.module('sportsapi',[])
    .factory('sportsService', sportsService)

    sportsService.$inject = ['$http']
    function sportsService($http){
      var service = {
        index : index,
        attendance : attendance
      }
      return service

      function index(){
        return $http.get('/api/stats')
      }

      function attendance(){
        return $http.get('/api/attendance')
      }
    }

})()
