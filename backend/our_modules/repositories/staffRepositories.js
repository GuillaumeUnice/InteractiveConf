var dao = require('../dao').getConnection();


/**
* StaffRepository contains all functions in order to request Database about 'staff' table
*
*/
function StaffRepository () {

  this.tableName = "staff";

  /**
   * findStaffByPseudo ------
   *  - pseudo : string pseudo user
   *  - callback : function callback who contains SQL result
   */
  this.findStaffByPseudo = function(pseudo, callback) {
     	dao.query('SELECT * FROM ' + this.tableName + ' WHERE pseudo = ?', pseudo, function(err, result) {
     		        
        if(err) { return callback(err); }
        callback(null, result);
     	});
  };
};

exports.StaffRepository = StaffRepository;