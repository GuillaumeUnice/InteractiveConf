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
        dao.query('UPDATE ' + this.tableName + ' SET status_code = ? WHERE id = ?', [statusCode, questionID], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    /**
     * addQuestionWithStatus ------
     *  - questionContent : string the question's content
     *  - statusCode : int the question's state
     *  - callback : function callback who contains SQL result
     *  - userID : int user's id
     */
    this.addQuestionWithStatus = function (questionContent, statusCode, callback, userID) {
        dao.query('INSERT ' + this.tableName + ' (content, status_code, public_id) VALUES (?, ?, ?)', [questionContent, statusCode, userID], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    this.addQuestion = function (question, statusCode, callback) {
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
        dao.query('UPDATE ' + this.tableName + ' SET status_code = ?, question_id = ? WHERE id IN (?) OR question_id IN (?)',
         [statusCode, questionID, idQuestionsMerged, idQuestionsMerged], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };
};

exports.QuestionRepository = QuestionRepository;