var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

var questionRepositoryModule = require('../our_modules/repositories/questionRepositories');
var questionRepository = new questionRepositoryModule.QuestionRepository();

var responseRepositoryModule = require('../our_modules/repositories/responseRepositories');
var responseRepository = new responseRepositoryModule.ResponseRepository();

var favoriteRepositoryModule = require('../our_modules/repositories/favoriteRepositories');
var favoriteRepository = new favoriteRepositoryModule.FavoriteRepository();

/**********************************************************************************
 *            Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function (req, res, next) {
    console.log('Middleware called [QUESTIONS].');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});

/**********************************************************************************
 *                                Route for question
 **********************************************************************************/

// Route ➜  /api/question/

router.route('/')
    // @GET list of questions
    .get(function (req, res) {
        console.log('get method questions');
        sql.select(res, 'questions');
    })
    // @POST a question
    .post(function (req, res) {
        console.log('post method questions');
        sql.insert(res, 'questions', req.body);

    });

// Route ➜  /api/question/info

router.route('/info/')
    // @GET a question with user info
    .get(function (req, res) {
        console.log("GET router.route('/info/')");
        questionRepository.getQuestionsInfo(function (err, result) {
            //console.log("questionRepository.getQuestionsInfo");
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);
        });
    });

    router.route('/infoC/')
    // @GET a question with user info
    .get(function (req, res) {
       
        questionRepository.getQuestionsChairmanInfo(function (err, result) {
         
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);
        });
    });

router.route('/validInfo/:publicId')
    // @GET a question with user validInfo
    .get(function (req, res) {
        console.log("GET router.route('/validInfo/')");

        // toutes les questions qui n'ont pas de status 15 ou egale à l'id du user
        questionRepository.getQuestionsInfoByPublicId(req.params.publicId, function (err, result) {
            console.log("questionRepository.getQuestionsInfoByPublicId");
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            // récupere toute les questions qui ont ete mergées
            questionRepository.getMergedQuestionsInfoByPublicId(req.params.publicId, result, function (err, merged) {
                console.log("questionRepository.getQuestionsInfoByPublicId");
                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }

                // on reforme bien l'objet avec un attribut merge (array contenant les questions mergées)
                for (var i = 0; i < result.length; i++) {

                    // si objet non défini on le crée (permet de ne pas overide si on a un merge de merge)
                    if(result[i].merge === undefined) {
                        result[i].merge = [];
                    }

                    // ajout de chaque question a merger dans la question principale
                    for (var j = 0; j < merged.length; j++) {
                        if (result[i].questionid === merged[j].question_id) {
                            result[i].merge.push(merged[j]);
                        }
                        if(merged[j].merge !== undefined) {
                            for(var t = 0; t < merged[j].merge.length; t++) {
                                result[i].merge.push(merged[j].merge[t]);
                            }
                        }
                    }

                    // vérification des status code et public id
                    if(result[i].status_code === 15 && result[i].public_id === req.params.publicId) {
                        result.splice(i, 1);
                    }
                }

                //console.log("---------------------------------");
                //console.log(result);
                //console.log("---------------------------------");
                //console.log(merged);

                res.json(result);

            });
        });
    });

router.route('/info/:id')
    // @GET a question with user info
    .get(function (req, res) {
        console.log("GET router.route('/info/')");
        questionRepository.getQuestionInfoByID(req.params.id, function (err, result) {
            //console.log("questionRepository.getQuestionInfoByID");
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);
        });
    });

router.route('/status/:status_code')
    // @GET a question with user info
    .get(function (req, res) {
        console.log("GET router.route('/status/:status_code')");
        questionRepository.getQuestionsByStatus(req.params.status_code, function (err, result) {
            //console.log("questionRepository.getQuestionsByStatus");
            var questions = [];
            var tmpObj = {};
            for (var i = 0; i < result.length; i++) {
                tmpObj = {
                    content: result[i].content,
                    createdAt: result[i].created_at,
                    id: result[i].id,
                    nom: result[i].nom,
                    numSlide: result[i].num_slide,
                    prenom: result[i].prenom,
                    publicId: result[i].public_id,
                    statusCode: result[i].status_code,
                    upVote: result[i].up_vote
                };

                questions[i] = tmpObj;
            }
            // console.log(questions);
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(questions);
        });
    });

// Route ➜  /api/question/:id

router.route('/:id')
    // @GET a particular question
    .get(function (req, res) {
        console.log('get method questions');
        sql.select(res, 'questions', req.params.id);
    })
    // @PUT update a particular question
    .put(function (req, res) {
        console.log('put method questions');
        sql.update(res, 'questions', req.body, req.params.id);
    });

router.route('/private/:id')
    // @DELETE a particular question
    .delete(function (req, res) {
        console.log('delete method questions');
        sql.del(res, 'questions', req.params.id);
    });


/*
 * ASSISTANT
 */

router.route('/sendToSpeaker')
    .post(function (req, res) {
        console.log("POST router.route('/sendToSpeaker')");
        var theId = req.body.questionid || req.body.id;

        questionRepository.changeStatusQuestionById(theId, constants.QUESTION_STATUS_SENT, function (err, result) {

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            req.body.status_code = constants.QUESTION_STATUS_SENT;
            mySocket.sendByNamespace(constants.SPEAKER_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'La question a été envoyé au conférencier.'
            });
        });
    });


router.route('/addAndSendToSpeaker')
    .post(function (req, res) {

        console.log("POST router.route('/addAndSendToSpeaker')");

        questionRepository.addQuestionWithStatus(req.body.content, constants.QUESTION_STATUS_SENT, function (err, result) {

            //console.log("questionRepository.addQuestionWithStatus");

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            var newQuestion = {
                id: result.insertId,
                content: req.body.content,
                status_code: constants.QUESTION_STATUS_SENT,
                num_slide: null
                // content 
                // status_code 
                // public_id   
                // num_slide  
                // up_vote 
                // question_id 
                // created_at
            };
            // TODO on recupere la question depuis la bdd pour avoir un objet bien construit

            mySocket.sendByNamespace(constants.SPEAKER_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, newQuestion);

            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'La question a été envoyé au conférencier.'
            });
        });
    });


router.route('/sendSpeakerEndQuestion')
    .post(function (req, res) {

        console.log("POST router.route('/sendSpeakerEndQuestion')");

        mySocket.sendByNamespace(constants.SPEAKER_NAMESPACE, 'endQuestion', req.body);
        res.status(201);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Question',
            message: 'La modification des questions de fin a été pris en compte.'
        });
    });

router.route('/deleteQuestionByChairman')
    .post(function (req, res) {

        console.log("POST router.route('/deleteQuestionByChairman')");

        questionRepository.changeStatusQuestionById(req.body.id, constants.QUESTION_STATUS_IGNORED, function (err, result) {

            //console.log("questionRepository.changeStatusQuestionById");

            if (err) {
                console.log(err);
                res.status(404);
                res.json({
                    status: constants.JSON_STATUS_ERROR,
                    title: 'Question',
                    message: 'La question n\'a pas pu être supprimé de la base de données'
                });
                return;
            }

            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'La suppression de la question a été prise en compte.'
            });
        });
    });

// TODO : retourner toutes les questions merger pour le public? Faire une requete SQL de recuperation
router.route('/sendMergedQuestion')
    .post(function (req, res) {

        console.log("POST router.route('/sendMergedQuestion')");
        // console.log(req.body.otherQuestions);
        var idOtherQuestions = [];
        for (otherQuestion of req.body.otherQuestions) {
            idOtherQuestions.push(otherQuestion.id);
        }

        questionRepository.mergedQuestionById(req.body.mainQuestion.id, idOtherQuestions, constants.QUESTION_STATUS_MERGED, function (err, result) {

            //console.log("questionRepository.mergedQuestionById");
            //console.log();
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
        });

        for(var i = 0; i < req.body.otherQuestions.length; i++) {
            req.body.otherQuestions[i].question_id = req.body.mainQuestion.id;
            req.body.otherQuestions[i].status_code = constants.QUESTION_STATUS_MERGED;
        }
        mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, "merge", req.body);
        res.status(201);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Question',
            message: 'Le merge a été effectué.'
        });

    });


/**
 * PUBLIC
 */
router.route('/sendToModerator')
    .post(function (req, res) {

        console.log('POST route ' + req.url + ' called');
        // console.log(req.body);
        req.body.up_vote = 1;
        questionRepository.addQuestionWithStatus(req.body.content, constants.QUESTION_STATUS_CREATED, function (err, result) {

            //console.log("questionRepository.addQuestionWithStatus");

            if (err) {
                console.log("Erreur dans addQuestion : " + req.url);
                console.log(err);
                res.status(404);
                return;
            }

            req.body.id = result.insertId;
            //req.body.created_at = new Date().getTime() / 1000;
            req.body.status_code = constants.QUESTION_STATUS_CREATED;


            mySocket.sendByNamespace(constants.MODERATOR_NAMESPACE, 'questionFromPublic', req.body);
            mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, 'questionFromPublicToPublic', req.body);

            // Ajouter dasn favoris
            favoriteRepository.addToFavorites({question_id: result.insertId, public_id: req.body.public_id});

            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'Question sauvegardée'
            });
        }, req.body.public_id, req.body.num_slide, req.body.up_vote);
    });


router.route('/sendToChairmanEndQuestion')
    .post(function (req, res) {

        console.log("POST router.route('/sendToChairmanEndQuestion')");

        var theId = req.body.questionid || req.body.id;

        questionRepository.getQuestionInfoByID(theId, function (err, result) {

            //console.log("questionRepository.getQuestionInfoByID");
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);
            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: "La question a été envoyé à l'assistant."
            });
        });

    });

/**
 * MODERATOR
 *
 ######################################################
 */

router.route('/toModerator/:status_code')
    .get(function (req, res) {

        console.log("GET router.route('/toModerator/:status_code')");

        questionRepository.getQuestionByStatusValide(req.params.status_code, function (err, result) {

            //console.log("questionRepository.getQuestionByStatusValide");

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.json(result);

        });
    });

router.route('/sendToPublic/:id')
    .put(function (req, res) {
       /* console.log("POST router.route('/sendToPublic/:id')");
        mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, "questionDeleted", req.body);
        sql.update(res, 'questions', req.body, req.params.id);*/


        // changement du statut de la question
        questionRepository.changeStatusQuestionById(req.body.id, constants. QUESTION_STATUS_DELETED, function (err, result) {

            //console.log("questionRepository.changeStatusQuestionById");

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            // recuperatin de la question
            questionRepository.getQuestionInfoByID(req.body.id, function (err, result) {

                //console.log("questionRepository.getQuestionInfoByID");

                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }

                mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);
                res.status(201);
                res.json({
                    status: constants.JSON_STATUS_SUCCESS,
                    title: 'Question',
                    message: 'La question à été envoyé au public'
                });
            });

        });

    });


router.route('/sendToChairmanVote/:id')
    .put(function (req, res) {
        console.log("PUT router.route('/sendToChairmanVote/:id')");
        
        questionRepository.voteUp(req.params.id, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            questionRepository.getQuestionInfoByID(req.params.id, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }

                req.body.up_vote = result.up_vote;
                mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_VOTE, req.body);
                mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_VOTE, req.body);


                res.status(201);
                res.json({
                    status: constants.JSON_STATUS_SUCCESS,
                    title: 'Question',
                    message: 'Le upvote à été envoyé au public et au chairman'
                });

            });
        });

    });

router.route('/sendToChairman/:id')
    .put(function (req, res) {
        console.log("PUT router.route('/sendToChairman/:id')");

        questionRepository.changeStatusToValide(req.params.id, req.body.status_code, req.body.content, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            questionRepository.getQuestionById(req.params.id, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404);
                    return;
                }
                result.prenom = req.body.prenom;
                result.nom = req.body.nom;

                mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);

                mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);


                res.status(201);
                res.json({
                    status: constants.JSON_STATUS_SUCCESS,
                    title: 'Question',
                    message: 'La question à été envoyé au public et au chairman'
                });

                /* res.json({ status : constants.JSON_STATUS_SUCCESS,
                 title: 'Question',
                 message: 'La validation de la question a été prise en compte.'}); */
                //res.json.status(constants.JSON_STATUS_SUCCESS);
            });

        });


        // // changement du statut de la reponse
        // questionRepository.changeStatusToValide(req.body.id, constants.QUESTION_STATUS_VALIDATED, req.body.content, function (err, result) {

        //     console.log("questionRepository.changeStatusQuestionById");

        //     if (err) {

        //         console.log(err);
        //         res.status(404);
        //         return;
        //     }


        //     // recuperatin de la question
        //     questionRepository.getQuestionInfoByID(req.body.id, function (err, result) {

        //         console.log("questionRepository.getQuestionInfoByID");

        //         if (err) {
        //             console.log(err);
        //             res.status(404);
        //             return;
        //         }

        //         // TODO creation at date

        //         mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);
        //         res.status(201);
        //         res.json({
        //             status: constants.JSON_STATUS_SUCCESS,
        //             title: 'Question',
        //             message: 'La question à été envoyé au public'
        //         });
        //     });

        // });
        //sql.update(res, 'questions', req.body, req.params.id);
    });


/**
 *
 * PUBLIC
 * ######################################################
 */

router.route('/sendAnswerToPublic')
    .post(function (req, res) {
        console.log("POST router.route('/sendAnswerToPublic')");

        // Ajout d'une reponse à la BD
        responseRepository.addResponse(req.body.response, req.body.question.id, function (err, result) {

            //console.log("responseRepository.addResponse");

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            // changement du statut de la reponse
            questionRepository.changeStatusQuestionById(req.body.question.id, constants.QUESTION_STATUS_ANSWERED, function (err, result) {

                //console.log("questionRepository.changeStatusQuestionById");

                if (err) {
                    console.log("REPONSE NON ENVOYEE AU PUBLIC");
                    console.log(err);
                    res.status(404);
                    return;
                }


                // recuperatin de la question
                questionRepository.getQuestionInfoByID(req.body.question.id, function (err, result) {

                    //console.log("questionRepository.getQuestionInfoByID");

                    if (err) {
                        console.log("REPONSE NON ENVOYEE AU PUBLIC");
                        console.log(err);
                        res.status(404);
                        return;
                    }

                    // TODO creation at date

                    mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, result);
                    console.log("REPONSE ENVOYEE AU PUBLIC");
                    res.status(201);
                    res.json({
                        status: constants.JSON_STATUS_SUCCESS,
                        title: 'Question',
                        message: 'La réponse été envoyé au public'
                    });
                });

            });
        });
    });


/**
 * CHAIRMAN
 */


router.route('/sendToScreen')
    .post(function (req, res) {

        console.log("POST router.route('/sendToScreen')");

        questionRepository.changeStatusQuestionById(req.body.id, constants.QUESTION_STATUS_DISPLAYED, function (err, result) {

            //console.log("questionRepository.changeStatusQuestionById");

            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            mySocket.sendByNamespace(constants.SCREEN_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'La question a été envoyé à l ecran.'
            });
        });
    });


module.exports = router;