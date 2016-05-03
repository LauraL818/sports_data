var
	express = require('express'),
	apiRouter = express.Router(),
	scrapeCtrl = require('../controllers/scrape.js')

apiRouter.route('/stats')
	.get(scrapeCtrl.getStats)

module.exports = apiRouter
