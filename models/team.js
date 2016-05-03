var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var teamSchema = new Schema({
  name: String,
  games: Number,
  ab: Number,
  runs: Number,
  hits: Number,
  doubles: Number,
  triples: Number,
  rbis: Number,
  bb: Number,
  ibb: Number,
  so: Number,
  avg: String,
  obp: String,
  slg: String
})

var Team = mongoose.model("Team", teamSchema)

module.exports = Team
