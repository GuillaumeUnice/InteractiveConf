/**
 * Created by yazide on 24/02/2016.
 */

var dao = require('../dao').getConnection();

/**
 * FavoriteRepository contains all functions in order to request Database about 'favorites' table
 *
 */
function FavoriteRepository () {

    this.tableName = "favorites";

    this.getPublicFavorite = function(publicID,callback) {

        dao.query('SELECT  q.id AS questionid, q.content, q.status_code, q.num_slide, q.up_vote, q.public_id, q.question_id , q.created_at, p2.nom, p2.prenom, r.content AS responsecontent ' +
            ' from favorites AS f ' +
            ' INNER JOIN questions AS q ON q.id = f.question_id ' +
            ' LEFT OUTER JOIN public AS p2 ON q.public_id = p2.id ' +
            ' LEFT OUTER JOIN responses AS r ON r.question_id = q.id ' +
            ' INNER JOIN public AS p ON p.id = f.public_id ' +
            ' WHERE (f.public_id = ?) OR (q.public_id = ?) GROUP BY q.id ' , [publicID,publicID], function (err, result) {
            if (err) {
                return callback(err);
            }
            console.log(result);
            callback(null, result);

        });



    };

    this.getQuestionWithUserName = function(question_id, callback) {
        dao.query('SELECT  q.question_id, q.id, q.content, q.status_code, q.num_slide, q.up_vote, q.created_at, q.public_id, p.nom, p.prenom ' +
            'from questions AS q INNER JOIN public AS p ON q.public_id = p.id ' +
            'WHERE q.id = ' + question_id, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);

        });

    };

    this.addToFavorites = function (favorite) {
        dao.query('INSERT into favorites  set ?', favorite, function(err, result){

        });
    };

    }

exports.FavoriteRepository = FavoriteRepository;