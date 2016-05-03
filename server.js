var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  path = require('path'),
  apiRoutes = require('./routes/api.js')

var db = 'mongodb://localhost/sports-data'

mongoose.connect(db, function(err){
  if(err) return console.log(err)
  console.log('Connected to ' + db)
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', apiRoutes)

var PORT = process.env.PORT || 3000
app.listen(PORT, function(){
  console.log('server is listening on 3000')
})
