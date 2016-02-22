// mysocket global socket

var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');

var dao = require('../our_modules/dao').getConnection();

var constants = require('../our_modules/constants');

var staffRepositoryModule = require('../our_modules/repositories/staffRepositories');
var staffRepository = new staffRepositoryModule.StaffRepository();

// module authentification
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10); // salage


/*  ==============================   *
 *                                   *
 *   TODO : Separez vos routes       * 
 *   dans des fichiers differents    *
 *   ca devenait deguelasse ! ^_^    *
 *                                   *
 * ==============================    */



//var newUser = require('../our_modules/fillDb').getNewUser();
//var newQuestion = require('../our_modules/fillDb').getNewQuestion();
//var newResponse = require('../our_modules/fillDb').getNewResponse();

/**********************************************************************************
 *                      Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called.');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next(); // go to the next route
});


/**********************************************************************************
 *                Route for Home API
 **********************************************************************************/

router.get('/', function (req, res) {
    res.json({message: 'Hello from API documentation...'});
});


/**********************************************************************************
 *                Route for auth API
 **********************************************************************************/

router.route('/auth/login')
    .post(function (req, res) {
        staffRepository.findStaffByPseudo(req.body.pseudo, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404);
                res.json({
                    status: constants.JSON_STATUS_ERROR,
                    title: 'Erreur Système',
                    message: 'Une erreur inattendue s\'est produit! Veuillez contacter l\'administrateur'
                });
                return;
            }
            // verify if correct password thank to BCrypt Hash
            // resCompare = true if same password else false
            if (result[0] === undefined) {
                res.status(201);
                res.json({
                    status: constants.JSON_STATUS_ERROR,
                    title: 'Erreur connexion',
                    message: 'L\'utilisateur n\'existe pas! Pseudo incorrect!'
                });
            } else {

                bcrypt.compare(req.body.password, result[0].password, function (err, resCompare) {
                    if (err) {
                        console.log(err);
                        res.status(404);
                        return;
                    }

                    if (resCompare) {
                        var token = jwt.sign(result[0].pseudo, constants.JWT_SECRET, {expiresInMinutes: 60 * 5});
                        res.status(201);
                        res.json({
                            status: constants.JSON_STATUS_SUCCESS,
                            title: 'Connexion',
                            message: 'Vous êtes à présent connecté!',
                            token: token
                        });
                    } else {
                        res.status(201);
                        res.json({
                            status: constants.JSON_STATUS_ERROR,
                            title: 'Erreur connexion',
                            message: 'Le mot de passe est incorrect!'
                        });
                    }

                });
            }
        });
    });

router.route('/auth/register')
    .post(function (req, res) {
        //console.log('/auth/login' + req.params.pseudo + req.params.password);
        //console.log('post method login pseudo : ' + req.body.pseudo + ' mdp : ' + req.body.password);
        //var hashPassword = bcrypt.hashSync(req.body.password, salt);
        //console.log(hashPassword);
        console.log('post method register');
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        sql.insert(res, dao, 'staff', req.body);
    });

/**
 * Authentification for moderator
 */
router.route('/auth/signup')
    .post(function (req, res) {
        console.log('----> method signup');
       // sql.insert(res, dao, 'staff', req.body);
        dao.query('INSERT INTO staff (`pseudo`,`password`,`role`,`socket_id`) VALUES ('+'\'' + req.body.pseudo + '\''+',' + '\'' + req.body.password + '\'' + ',' + '\'' + 10 + '\'' +',' + '\'' + ''+ '\'' + ')',  function(err, result){
            if(err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);
            console.log(result);
        });
    });

router.route('/auth/signin')
    .post(function (req, res) {
        console.log('----> method signin');
        console.log(req.body);
        dao.query('SELECT * FROM ' + 'staff' + ' WHERE password = '+ '\'' + req.body.password + '\'',  function(err, result) {
            if(err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);
            console.log(result);
        });
    });




module.exports = router;