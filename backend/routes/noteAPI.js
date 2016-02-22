
var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called [NOTE].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 *                Route for note
 **********************************************************************************/


router.route('/sendToSpeaker')
    .post(function (req, res) {
        console.log(req.body)
        res.status(201);
        mySocket.sendByNamespace(constants.SPEAKER_NAMESPACE, constants.NAMESPACE_RESOURCE_NOTE, req.body);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Note',
            message: 'La note été envoyé au conférencier'
        });
    });


module.exports = router;