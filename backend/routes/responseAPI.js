var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called [RESPONSES].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 *                Route for responses
 **********************************************************************************/

// Route ➜  /api/responses/

router.route('/')
    // @GET list of questions
    .get(function (req, res) {
        console.log('get method responses');
        sql.select(res, 'responses');
    })
    // @POST a response
    .post(function (req, res) {
        console.log('post method responses');
        sql.insert(res, 'responses', req.body);
    });

// Route ➜  /api/responses/:id

router.route('/:id')
    // @GET a particular response
    .get(function (req, res) {
        console.log('get method responses');
        sql.select(res, 'responses', req.params.id);
    });

router.route('/private/:id')
    // @DELETE a particular response
    .delete(function (req, res) {
        console.log('delete method responses');
        sql.del(res, 'responses', req.params.id);
    });

module.exports = router;