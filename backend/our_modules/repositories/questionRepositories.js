var dao = require('../dao').getConnection();

var constants = require('../constants');
/**
 * UserRepository contains all functions in order to request Database about 'users' table
 *
 */
function QuestionRepository() {

    this.tableName = "questions";

    /**
     * changeStatusQuestionById ------
     *  - questionID : int question's id
     *  - statusCode : int the new question's state
     *  - callback : function callback who contains SQL result
     */
    this.changeStatusQuestionById = function (questionID, statusCode, callback) {
        // console.log("changeStatusQuestionById");
        dao.query('UPDATE ' + this.tableName + ' SET status_code = ? WHERE id = ?', [statusCode, questionID], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    this.changeStatusToValide = function (questionID, statusCode, content, callback) {
        // console.log("changeStatusQuestionById");
        dao.query('UPDATE ' + this.tableName + ' SET status_code = ? , content = ? WHERE id = ?', [statusCode, content, questionID], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

        /**
     * getQuestionById ------
     *  - questionID : int question's id
     *  - callback : function callback who contains SQL result
     */
    this.getQuestionById = function (questionID, callback) {
        // console.log("getQuestionById");
        dao.query('SELECT * FROM ' + this.tableName + ' WHERE id = ?', [questionID], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]);
        });
    };
    

    /**
     * addQuestionWithStatus ------
     *  - questionContent : string the question's content
     *  - statusCode : int the question's state
     *  - callback : function callback who contains SQL result
     *  - userID : int user's id
     */
    this.addQuestionWithStatus = function (questionContent, statusCode, callback, userID, numSlide, upVote) {
        // console.log("addQuestionWithStatus");
        dao.query('INSERT ' + this.tableName + ' (content, status_code, public_id, num_slide, up_vote, created_at) VALUES (?, ?, ?, ?, ?, NOW())', [questionContent, statusCode, userID, numSlide, upVote], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    this.addQuestion = function (question, statusCode, callback) {
        // console.log("addQuestion");
        question.status_code = constants.QUESTION_STATUS_CREATED;
        dao.query('INSERT into ' + this.tableName + ' set ?', question, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    //this.getQuestion = function (question_id, callback) {
    //    dao.query('SELECT * FROM ' + this.tableName + ' WHERE id = ?', [question_id], function(err, result) {
    //        if (err) {
    //            return callback(err);
    //        }
    //        callback(null, result);
    //    });
    //};

    /**
     * mergedQuestionById ------
     *  - questionID : int the question's id of the main merged question
     *  - idQuestionsMerged : the questions will be merged with the main
     *  - statusCode : int the new question's state of questionMerged
     *  - callback : function callback who contains SQL result
     */
    this.mergedQuestionById = function (questionID, idQuestionsMerged, statusCode, callback) {
        // console.log("mergedQuestionById");
        dao.query('UPDATE ' + this.tableName + ' SET status_code = ?, question_id = ? WHERE id IN (?) OR question_id IN (?)',
         [statusCode, questionID, idQuestionsMerged, idQuestionsMerged], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };


    this.getQuestionByStatusValide = function(status_code,callback) {
        // console.log("getQuestionByStatusValide");
        dao.query('SELECT q.id, q.content, q.status_code, q.public_id, q.num_slide,  q.up_vote, q.created_at, p.nom, p.prenom ' +
            ' FROM questions AS q INNER JOIN public AS p ON q.public_id = p.id ' +
            ' WHERE q.status_code = ? ', status_code, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    this.getQuestionsByStatus = function(status_code,callback) {
        // console.log("getQuestionsByStatus");
        dao.query('SELECT q.id, q.content, q.status_code, q.public_id, q.num_slide, q.up_vote, q.created_at, p.nom, p.prenom ' +
            ' FROM questions AS q INNER JOIN public AS p ON q.public_id = p.id ' +
            ' WHERE q.status_code = ? ', status_code, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };


    /**
     * Récupère toutes les info sur des questions :
     * reponse, question, public info
     * @param callback
     */
    this.getQuestionsInfo = function (callback) {
        // console.log("getQuestionsInfo");
        dao.query('SELECT responses.content as responsecontent, ' +
                 'questions.id AS questionid, questions.content, questions.status_code, ' +
                 'questions.public_id, questions.num_slide, questions.up_vote, ' +
                 'questions.question_id, ' +
                 'questions.created_at, public.nom, public.prenom ' +
                 'FROM questions ' +
                 'INNER JOIN public ON public.id = questions.public_id ' +
                 'LEFT OUTER JOIN responses ON responses.question_id = questions.id' , function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

        /**
     * Récupère toutes les info sur des questions :
     * reponse, question, public info
     * @param callback
     */
    this.getQuestionsChairmanInfo = function (callback) {
        // console.log("getQuestionsChairmanInfo");
        dao.query('SELECT responses.content as responsecontent, ' +
                 'questions.id , questions.content, questions.status_code, ' +
                 'questions.public_id, questions.num_slide, questions.up_vote, ' +
                 'questions.question_id, ' +
                 'questions.created_at, public.nom, public.prenom ' +
                 'FROM questions ' +
                 'INNER JOIN public ON public.id = questions.public_id ' +
                 'LEFT OUTER JOIN responses ON responses.question_id = questions.id' , function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };
    /**
     * Récupère toutes les info des questions valid pour un public et non mergée :
     * 
     * @param callback
     */
    this.getQuestionsInfoByPublicId = function (publicId, callback) {
        // console.log("getQuestionsInfoByPublicId");

        dao.query('SELECT responses.content as responsecontent, ' +
            'questions.id AS questionid, questions.content, questions.status_code, questions.public_id, questions.num_slide, questions.up_vote, questions.created_at, questions.question_id, ' +
            'public.nom, public.prenom ' +
            'FROM questions ' +
            'INNER JOIN public ON public.id = questions.public_id ' +
            'LEFT OUTER JOIN responses ON responses.question_id = questions.id ' +
            'WHERE (questions.status_code != ? AND questions.status_code > ? AND questions.status_code != ?) OR (questions.public_id = ?)', [15, 0, 10, publicId] , function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    this.getMergedQuestionsInfoByPublicId = function (publicId, unMergedQuestions, callback) {
        // console.log("getMergedQuestionsInfoByPublicId");

        dao.query('SELECT responses.content as responsecontent, ' +
            'questions.id AS questionid, questions.content, questions.status_code, questions.public_id, questions.num_slide, questions.up_vote, questions.created_at, questions.question_id, ' +
            'public.nom, public.prenom ' +
            'FROM questions ' +
            'INNER JOIN public ON public.id = questions.public_id ' +
            'LEFT OUTER JOIN responses ON responses.question_id = questions.id ' +
            'WHERE questions.status_code = ?', 15, function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };


    this.getQuestionInfoByID = function (questionID, callback) {
        // console.log("getQuestionInfoByID");
        dao.query('SELECT responses.content as responsecontent, ' +
            'questions.id AS questionid, questions.content, questions.status_code, ' +
            'questions.public_id, questions.num_slide, questions.up_vote, ' +
            'questions.created_at, public.nom, public.prenom, ' +
            'questions.question_id ' +
            'FROM questions ' +
            'INNER JOIN public ON public.id = questions.public_id ' +
            'LEFT OUTER JOIN responses ON responses.question_id = questions.id ' +
            'WHERE questions.id = '  + questionID, function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result[0]);
        });
    };

    this.voteUp = function (questionID, callback) {
        // console.log("getQuestionInfoByID");
        dao.query('Update ' + this.tableName +  
            ' Set up_vote = up_vote+1 ' +
            ' WHERE id = '  + questionID, function (err, result) {

            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

}

exports.QuestionRepository = QuestionRepository;