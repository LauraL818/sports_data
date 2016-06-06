var
	express = require('express'),
	apiRouter = express.Router(),
	scrapeCtrl = require('../controllers/scrape.js')

apiRouter.route('/stats')
	.get(scrapeCtrl.getStats)

apiRouter.route('/attendance')
	.get(scrapeCtrl.getAttendance)

module.exports = apiRouter
