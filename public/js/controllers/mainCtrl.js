  angular.module('sports')
    .controller('MainController', MainController)

  MainController.$inject = ['sportsService']

  function MainController(sportsService){
    var vm = this
    vm.title = 'Sports'

    sportsService.index().success(function(results){
      console.log(results)
      vm.players = results
    })

    // vm.showPokemon = function(id){
    //   pokeService.show(id).success(function(results){
    //     console.log(results)
    //     vm.selectedPokemon = results
    //   })
    // }
  }
