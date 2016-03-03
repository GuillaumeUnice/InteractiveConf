var dao = require('../dao').getConnection();


/**
 * PublicRepository contains all functions in order to request Database about 'public' table
 *
 */
function PublicRepository() {

    this.tableName = "public";

    /**
     * findPublicByHash
     *  - hash : string hash from coockie
     *  - callback : function callback who contains SQL result
     */
    this.findPublicByHash = function (hash, callback) {
        dao.query('SELECT * FROM ' + this.tableName + ' WHERE hash_cookie = ?', hash, function (err, result) {
            console.log(result);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    /**
     * findPublicById
     *  - id : string hash from coockie
     *  - callback : function callback who contains SQL result
     */
    this.findPublicById = function (id, callback) {
        dao.query('SELECT * FROM ' + this.tableName + ' WHERE id = ?', id, function (err, result) {
            console.log(result);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };

    /**
     * addPublic
     *  - hash : string hash
     *  - nom : string nom
     *  - prenom : string prenom
     *  - callback : function callback who contains SQL result
     */
    this.addPublic = function (hash, nom, prenom, callback) {
        dao.query('INSERT INTO ' + this.tableName + ' (hash_cookie, nom, prenom) VALUES (?, ?, ?) ', [hash, nom, prenom], function (err, result) {
            console.log(result);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    };
}

exports.PublicRepository = PublicRepository;