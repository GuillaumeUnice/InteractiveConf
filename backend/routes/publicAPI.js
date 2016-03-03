var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

var publicRepositoryModule = require('../our_modules/repositories/publicRepositories');
var publicRepository = new publicRepositoryModule.PublicRepository();

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10); // salage


/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function(req, res, next) {
    console.log('Middleware called [PUBLIC].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 * 								Route for public
 **********************************************************************************/
// Route ➜  /api/public
 
router.route('/')
    // @GET list of users
    .get(function(req, res) {
        console.log('get method public');
        sql.select(res, 'public');
    })
    // @POST a user
    .post(function(req, res) {
      console.log('post method public');
      sql.insert(res, 'public', req.body);
    });

// Route ➜  /api/public/:id

router.route('/:id')
    // @GET a particular user
    .get(function(req, res) {
        console.log('get method public');
        sql.select(res, 'public', req.params.id);
    })
    // @PUT update a particular user
    .put(function(req, res) {
        console.log('put method public');
        sql.update(res, 'public', req.body, req.params.id);
    });

router.route('/private/:id')
    // @DELETE a particular user
    .delete(function (req, res) {
        console.log('delete method public');
        sql.del(res, 'public', req.params.id);
    });

router.route('/login/')
    .post(function (req, res) {
        publicRepository.findPublicByHash(req.body.hash, function (err, result) {

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            res.status(200);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: '',
                message: ''
            });
        });
    });

router.route('/register/')
    .post(function (req, res) {
        var prenom = req.body.prenom;
        var nom = req.body.nom;
        var hash = bcrypt.hashSync("conf"+nom+prenom+Date.now(), salt);
        
        publicRepository.addPublic(hash, nom, prenom, function (err, result) {

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            var newUser = {
                id: result.insertId,
                prenom: prenom,
                nom: nom,
                hash: hash
            };

            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: '',
                message: '',
                user: newUser
            });
        });
    });

module.exports = router;