  angular.module('sports')
    .controller('MainController', MainController)
    .directive('profileChart', profileChart)

  MainController.$inject = ['sportsService']

  function MainController(sportsService){
    var vm = this
    vm.title = 'Sports'

    vm.getTeams = function(){
      sportsService.index().success(function(results){
        vm.players = results
        vm.names = []
        vm.games = []
        vm.ab = []
        vm.runs = []
        vm.hits = []
        vm.doubles = []
        vm.triples = []
        vm.homers = []
        vm.rbis = []
        vm.bb = []
        vm.ibb = []
        vm.so = []
        vm.avg = []
        vm.obp = []
        vm.slg = []
        for(var i = 0; i < results.length; i++){
          vm.names.push(results[i].name)
          vm.games.push(results[i].games)
          vm.ab.push(results[i].ab)
          vm.runs.push(results[i].runs)
          vm.hits.push(results[i].hits)
          vm.doubles.push(results[i].doubles)
          vm.triples.push(results[i].triples)
          vm.homers.push(results[i].homers)
          vm.rbis.push(results[i].rbis)
          vm.bb.push(results[i].bb)
          vm.ibb.push(results[i].ibb)
          vm.so.push(results[i].so)
          vm.avg.push(results[i].avg)
          vm.obp.push(results[i].obp)
          vm.slg.push(results[i].slg)
        }
      })
    }

    vm.getAttendance = function(){
      sportsService.attendance().success(function(results){
        console.log(results)
      })
    }


  //   vm.getNames = function(){
  //     console.log(vm.names)
  //   }
  }

    function profileChart(){
        var directive = {
          restrict:'EA',
            scope: {
              names: '@',
              hits:'@',
              walks:'@',
              homers:'@'
            },
            link: function(scope,el){

              scope.$watch('homers', function(){

                  /////////// START CONVERTING STRING DATA INTO INTEGERS////////////
                    var hom = scope.homers.replace(/((\[)|(\]))/g,'').split(",")
                    var homers = []
                    for(var i=0; i < hom.length; i++){
                      homers.push(parseInt(hom[i]))
                    }

                    var h = scope.hits.replace(/((\[)|(\]))/g,"").split(",")
                    var hits = []
                    for(var i=0; i < h.length; i++){
                      hits.push(parseInt(h[i]))
                    }

                    var w = scope.walks.replace(/((\[)|(\]))/g,"").split(",")
                    var walks = []
                    for(var i=0; i < w.length; i++){
                      walks.push(parseInt(w[i]))
                    }

                    var n = scope.names.replace(/((\[)|(\]))/g,"").split(",")
                    var names = []
                    for(var i=0; i < n.length; i++){
                      names.push(n[i].replace(/["']/g, ""))
                    }

                    ///////////////////////// END CONVERTING DATA ////////////////////

                    ///////////////////////// DATA FOR SCATTER PLOT //////////////////
                    var dataset = []
                    for(var i = 0; i < homers.length; i ++){
                      var arr = []
                      arr.push(homers[i])
                      arr.push(hits[i])
                      arr.push(walks[i])
                      arr.push(names[i])
                      dataset.push(arr)
                    }


                    // ///////////////////////// END SCATTER PLOT //////////////////////
                    //
                    // //////////////////////// START D3 SCATTER PLOT /////////////////////
                    var w = 1200
                    var h = 500
                    var padding = 60

                    var svg = d3.select("#scatter")
                                .append("svg")
                                .attr("width", w)
                                .attr("height", h)

                    var tooltip = d3.select("svg")
                              .append("text")
                              .attr("class", "tooltip")
                              .style("opacity", 0)
                              .style("text-anchor","start")
                              .attr("startOffset","100%")
                              .attr("fill", "black")

                    var rScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[2] })])
                                 .range([2, 20]);

                    var xScale = d3.scale.linear()
                                  .domain([0, d3.max(dataset, function(d){ return d[1] })])
                                  .range([padding, w - padding * 2])

                    var yScale = d3.scale.linear()
                                  .domain([0, d3.max(dataset, function(d){ return d[0] })])
                                  .range([h - padding, padding])

                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(8)

                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(8)


                    var circles = svg.selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle")
                      .attr("cx", function(d){
                        return xScale(d[1])
                      })
                      .attr("cy", function(d){
                        return yScale(d[2])
                      })
                      .attr("r", function(d){
                        return rScale(d[0])
                      })
                      .attr("fill", "#E8A8A8")
                      .style("opacity", 1)

                      circles.on("click", function(d) {
                      circles.style("opacity", .2)
                      tooltip.transition()
                          .duration(200)
                          .style("opacity", 1);
                      tooltip.text(d[3])
                          .attr("x", xScale(d[1]))
                          .attr("y", yScale(d[2]))

                  })
                  .on("mouseout", function(d) {
                           circles.style("opacity", 1)
                           tooltip.transition()
                               .duration(100)
                               .style("opacity", 0);
                       })


                        svg.append("text")
                            .attr("class", "x label")
                            .attr("text-anchor", "end")
                            .attr("x", w/2)
                            .attr("y", h - 6)
                            .text("Hits")

                        svg.append("text")
                           .attr("transform", "rotate(-90)")
                           .attr("y", 0)
                           .attr("x",0 - (h / 2))
                           .attr("dy", "1em")
                           .style("text-anchor", "middle")
                           .text("Homers");

                         svg.append("g")
                           .attr("class", "axis")
                           .attr("transform", "translate(0," + (h - padding) + ")")
                           .call(xAxis)

                         svg.append("g")
                             .attr("class", "axis")
                             .attr("transform", "translate(" + padding + ",0)")
                             .call(yAxis)

              })

            } // End link
        } // End directive
        return directive
      } // End function
