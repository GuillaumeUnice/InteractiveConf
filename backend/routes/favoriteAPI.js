/**
 * Created by yazide on 23/02/2016.
 */

var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');


var favoriteRepositoryModule = require('../our_modules/repositories/favoriteRepositories');
var favoriteRepository = new favoriteRepositoryModule.FavoriteRepository();

var questionRepositoryModule = require('../our_modules/repositories/questionRepositories');
var questionRepository = new questionRepositoryModule.QuestionRepository();

/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called [FAVORITE].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 *                Route for favorite
 **********************************************************************************/


router.route('/sendToFavorite')
    .post(function (req, res) {
        var voted = false;
       // sql.select(res, 'favorites', req.param.id);


     /*   if(res !== undefined){
            //if(res.body.public_id === req.body.public_id && res.body.question_id === req.body.question_id){
                voted = true;
            //}
        }*/

        if(!voted) {
            mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_FAVORITE, req.body);
            sql.insert(res, 'favorites', req.body);
          //  res.status(201);
        }

    })
    .put(function (req, res) {

        sql.update(res, 'favorites', req.body, req.params.id);
        mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_FAVORITE, req.body);

        res.status(201);

    });


router.route('/')
    // @GET a particular favorite
    .get(function (req, res) {
        sql.select(res, 'favorites', req.params.id);
    });


router.route('/:id')
    // @GET favorites
    .get(function (req, res) {
        favoriteRepository.getPublicFavorite(req.params.id , function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }
            res.json(result);

            });
    });

router.route('/newFavorite/:id')
    // @GET favorites
    .get(function (req, res) {
        favoriteRepository.getQuestionWithUserName(req.params.id , function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }
            res.json(result);

            });
    });


/**
router.route('/favoriteMerge/:id')

    .get(function(req, res) {
        // récupere toute les questions qui ont ete mergées
        questionRepository.getMergedQuestionsInfoByPublicId(req.params.id, result, function (err, merged) {
            console.log("questionRepository.getQuestionsInfoByPublicId");
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            //console.log("question status code != 15");
            //console.log(result);
            //console.log("question status code = 15");
            //console.log(merged);

            // on reforme bien l'objet avec un attribut merge (array contenenant les questions mergée)
            for(var i = 0; i < result.length; i++) {
                result[i].merge = [];

                for(var j = 0; j < merged.length; j++) {
                    if (result[i].id === merged[j].question_id) {
                        //console.log("ok " + merged[j].content);
                        result[i].merge.push(merged[j]);
                        result.splice(j, 1);
                    }
                }
            }

            //console.log(result);
            res.json(result);
        });
    });
**/
module.exports = router;