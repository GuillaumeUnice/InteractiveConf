var dao = require('../dao').getConnection();


/**
* UserRepository contains all functions in order to request Database about 'users' table
*
*/
function ResponseRepository () {

  this.tableName = "responses";

  this.addResponse = function(responseContent, questionID, callback) {
      dao.query('INSERT ' + this.tableName + ' (content, question_id) VALUES (?, ?)', [ responseContent, questionID], function(err, result) {              
        if(err) { return callback(err); }
        callback(null, result);
      });
  };
};

exports.ResponseRepository = ResponseRepository;