var scrape = require('scrape-js')

module.exports = {
  getStats: function (req,res, callback){
    scrape('http://www.baseball-almanac.com/teamstats/hitting.php?y=2015&t=COL', ['tr'], function (error, data) {
        if(error) throw error;
        var playerStats = []
        data.forEach(function (element, idx) {
          if(idx > 15 && idx < 67) {
            var player = element.children('td:nth-child(1)').children('span:nth-child(1)').text().trim()
            var playerSplit = player.split(",")
            var playerName = playerSplit[1] + " " + playerSplit[0]
            var avgSplit = element.children('td:nth-child(13)').text()
            var avg = avgSplit.split('.').join('')
            var obpSplit = element.children('td:nth-child(14)').text()
            var obp = obpSplit.split('.').join('')
            var slgSplit = element.children('td:nth-child(15)').text()
            var slg = slgSplit.split('.').join('')

            playerStats.push({
              name: playerName,
              games: parseInt(element.children('td:nth-child(2)').text()),
              ab: parseInt(element.children('td:nth-child(3)').text()),
              runs: parseInt(element.children('td:nth-child(4)').text()),
              hits: parseInt(element.children('td:nth-child(5)').text()),
              doubles: parseInt(element.children('td:nth-child(6)').text()),
              triples: parseInt(element.children('td:nth-child(7)').text()),
              homers: parseInt(element.children('td:nth-child(8)').text()),
              rbis: parseInt(element.children('td:nth-child(9)').text()),
              bb: parseInt(element.children('td:nth-child(10)').text()),
              ibb: parseInt(element.children('td:nth-child(11)').text()),
              so: parseInt(element.children('td:nth-child(12)').text()),
              avg: avg,
              obp: obp,
              slg: slg
            })
          }
        })
        res.json(playerStats)
        // console.log(playerStats)
    })
  },
  getAttendance: function(req, res, callback){
    scrape('http://www.baseball-almanac.com/teams/rockattn.shtml', ['p'], function (error, data) {
        if(error) throw error;
        var attendanceStats = []
        data.forEach(function (element, idx) {

            if(idx >= 41 && idx <= 58) {
              var attendance = element.children().text()
              var attendanceNumber = attendance.replace(",", "")
              attendanceStats.push({
                attendance: parseInt(attendanceNumber)
              })
          }
        })
        res.json(attendanceStats)
    })
  }
}
