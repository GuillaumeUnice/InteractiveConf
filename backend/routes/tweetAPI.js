
var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called [TWEET].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 *                Route for tweet
 **********************************************************************************/


router.route('/sendToScreen')
    .put(function (req, res) {
        mySocket.sendByNamespace(constants.SCREEN_NAMESPACE, 'tweet', req.body);
        res.status(201);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Tweet',
            message: 'tweet validé'
        });
    });


router.route('/sendToPublic')
    .delete(function (req, res) {
        mySocket.sendByNamespace(constants.MODERATOR_NAMESPACE, 'tweetToPub', req.body);
        res.status(201);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Tweet',
            message: 'tweet supprimé'
        });
    });


module.exports = router;