  angular.module('sports')
    .controller('MainController', MainController)
    .directive('profileChart', profileChart)
    .directive('attendanceChart', attendanceChart)

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
        vm.attendances = []
        vm.years = []
        for(var i = 0; i < results.length; i ++){
          vm.attendances.push(results[i].attendance)
          vm.years.push(results[i].year)
        }
      })
    }

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


    function attendanceChart(){
        var directive = {
          restrict:'EAC',
            scope: {
              attendances: '@',
              years: '@'
            },
            link: function(scope,el){

              scope.$watch('attendances', function(){

                  /////////// START CONVERTING STRING DATA INTO INTEGERS////////////
                    var attend = scope.attendances.replace(/((\[)|(\]))/g,'').split(",")
                    var year = scope.years.replace(/((\[)|(\]))/g,'').split(",")

                    var attendances = []
                    var years = []
                    for(var i=0; i < attend.length; i++){
                      attendances.push(parseInt(attend[i]))
                      years.push(parseInt(year[i]))
                    }
                    console.log(attendances)
                    console.log(years)

                    ///////////////////////// END CONVERTING DATA ////////////////////

                    ///////////////////////// DATA FOR SCATTER PLOT //////////////////
                    var dataset = []
                    for(var i = 0; i < attendances.length; i ++){
                      var arr = []
                      arr.push(years[i])
                      arr.push(attendances[i])
                      dataset.push(arr)
                    }

                    console.log(dataset)


                    // ///////////////////////// END SCATTER PLOT //////////////////////

                    // //////////////////////// START D3 SCATTER PLOT /////////////////////

                    var vis = d3.select('#attendances')
                      width = 1000,
                      height = 500,
                      margins = {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50
                      },
                      xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([d3.min(dataset, function(d) {
                        return d[0];
                      }), d3.max(dataset, function(d) {
                        return d[0];
                      })]),
                      yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain(['0', d3.max(dataset, function(d) {
                        return d[1];
                      })]),
                      xAxis = d3.svg.axis()
                        .scale(xRange)
                        .tickSize(5)
                        .tickFormat(d3.format("d")),
                      yAxis = d3.svg.axis()
                        .scale(yRange)
                        .tickSize(5)
                        .orient('left')

                    vis.append('svg:g')
                      .attr('class', 'x axis')
                      .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
                      .call(xAxis);

                    vis.append('svg:g')
                      .attr('class', 'y axis')
                      .attr('transform', 'translate(' + (margins.left) + ',0)')
                      .call(yAxis);

                    var lineFunc = d3.svg.line()
                          .x(function(d) {
                            return xRange(d[0]);
                          })
                          .y(function(d) {
                            return yRange(d[1]);
                          })
                          .interpolate('linear');

                    vis.append('svg:path')
                      .attr('d', lineFunc(dataset))
                      .attr('stroke', 'blue')
                      .attr('stroke-width', 2)
                      .attr('fill', 'none');
              })

            } // End link
        } // End directive
        return directive
      } // End function
