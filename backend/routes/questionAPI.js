var express = require('express');
var router = express.Router();
var sql = require('../our_modules/sql');
var constants = require('../our_modules/constants');

var questionRepositoryModule = require('../our_modules/repositories/questionRepositories');
var questionRepository = new questionRepositoryModule.QuestionRepository();

var responseRepositoryModule = require('../our_modules/repositories/responseRepositories');
var responseRepository = new responseRepositoryModule.ResponseRepository();

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
        console.log("question " + req.body);

        questionRepository.changeStatusQuestionById(req.body.id, constants.QUESTION_STATUS_SENT, function (err, result) {
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
        console.log(req.body);

        questionRepository.addQuestionWithStatus(req.body.content, constants.QUESTION_STATUS_SENT, function (err, result) {
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
        mySocket.sendByNamespace(constants.SPEAKER_NAMESPACE, 'questionEnd', req.body);
        res.status(201);
        res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Question',
            message: 'La modification des questions de fin a été pris en compte.'
        });
    });

router.route('/deleteQuestionByChairman')
    .post(function (req, res) {
        console.log(req.body);
        questionRepository.changeStatusQuestionById(req.body.id, constants.QUESTION_STATUS_DELETED, function (err, result) {
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
        var idOtherQuestions = [];
        for (otherQuestion of req.body.otherQuestions) {
            idOtherQuestions.push(otherQuestion.id);
        }

        questionRepository.mergedQuestionById(req.body.mainQuestion.id, idOtherQuestions, constants.QUESTION_STATUS_MERGED, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
        });

        mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
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
        console.log(req.body);
        
        questionRepository.addQuestionWithStatus(req.body.content, constants.QUESTION_STATUS_CREATED, function (err, result) {
            if (err) {
                console.log("Erreur dans addQuestion : " + req.url);
                console.log(err);
                res.status(404);
                return;
            }

            req.body.id = result.insertId;
            //req.body.created_at = new Date().getTime() / 1000;

            mySocket.sendByNamespace(constants.MODERATOR_NAMESPACE, 'questionFromPublic', req.body);
            mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, 'questionFromPublicToPublic', req.body);

            res.status(201);
            res.json({
                status: constants.JSON_STATUS_SUCCESS,
                title: 'Question',
                message: 'Question sauvegardée'
            });
        }, req.body.public_id);
    });


router.route('/sendToChairmanEndQuestion')
    .post(function(req, res) {
        console.log(req.body);
        mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
        res.status(201);
        res.json({
            status : constants.JSON_STATUS_SUCCESS,
            title: 'Question',
            message: "La question a été envoyé à l'assistant."
        });
    });

router.route('/sendToPublic/:id')
    .post(function (req, res) {
        mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, 'question', req.body);
        console.log('delete method questions');
       /* res.json({
            status: constants.JSON_STATUS_SUCCESS,
            title: 'Question',
            message: 'La suppression de la question est terminée avec succès.'
        });*/
        sql.del(res, 'questions', req.params.id);
    });


router.route('/sendToChairmanVote/:id')
    .put(function (req, res) {
        mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_VOTE, req.body);
        sql.update(res, 'questions', req.body, req.params.id);
        console.log('vote Q to chairman ' + constants.NAMESPACE_RESOURCE_VOTE);
    });

router.route('/sendAnswerToPublic')
    .post(function (req, res) {
        console.log("Route : " + req.url);
        console.log(req.body);

        // Ajout d'une reponse à la BD
        responseRepository.addResponse(req.body.response, req.body.question.id, function (err, result) {
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }

            // changement du statut de la reponse
            questionRepository.changeStatusQuestionById(req.body.question.id, constants.QUESTION_STATUS_ANSWERED, function (err, result) {
                if (err) {
                    console.log("REPONSE NON ENVOYEE AU PUBLIC");
                    console.log(err);
                    res.status(404);
                    return;
                }

                mySocket.sendByNamespace(constants.PUBLIC_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
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


/**
 * CHAIRMAN
 */
router.route('/sendToChairman/:id')
    .put(function (req, res) {
        mySocket.sendByNamespace(constants.CHAIRMAN_NAMESPACE, constants.NAMESPACE_RESOURCE_QUESTION, req.body);
        sql.update(res, 'questions', req.body, req.params.id);
        console.log('new Q to chairman ' + constants.NAMESPACE_RESOURCE_QUESTION);
        /* res.json({ status : constants.JSON_STATUS_SUCCESS,
         title: 'Question',
         message: 'La validation de la question a été prise en compte.'}); */
        //res.json.status(constants.JSON_STATUS_SUCCESS);
    });

router.route('/sendToScreen')
    .post(function (req, res) {
        console.log(req.body.id)

        questionRepository.changeStatusQuestionById(req.body.id, constants.QUESTION_STATUS_DISPLAYED, function (err, result) {
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