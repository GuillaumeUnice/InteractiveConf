/**
 * Created by Romain on 04/12/2015.
 * Module pour methodes d'acces au donnees sql 
 */
var dao = require('../our_modules/dao').getConnection();

/**
 * INSERT ------
 *  - res : reponse callback
 *  - tablename : nom de la table
 *  - object : objet json bien formé avec les champs sauf id
 */
var insert = function(res, tablename, object) {
   	dao.query('INSERT into ' +tablename+ ' set ?', object, function(err, result) {
   		if(err) {
   			console.log(err);
            res.status(404);
   			return;
   		}
        //console.log(result);  // JSON.stringify(result) ➜ changer affichage log
        res.status(201);
        res.json(result);
   	});
};

/**
 * SELECT ------
 *  - res : reponse callback
 *  - tablename : nom de la table
 *  - id : un id passe dans l'url
 */
var select = function(res, tablename, id) {
   if(id === undefined) 
   {
   	dao.query('SELECT * FROM ' + tablename, function(err, result) {
   		if(err) {
   			console.log(err);
            res.status(404);
   			return;
   		}
   		// console.log(result);  // JSON.stringify(result) ➜ changer affichage log
   		res.json(result);
   	});
   } else {
      dao.query('SELECT * FROM ' + tablename + ' WHERE id = ?', id, function(err, result) {
         if(err) {
            console.log(err);
            res.status(404);
            return;
         }
         // console.log(result);  // JSON.stringify(result) ➜ changer affichage log
         res.json(result);
      });   
   }
};

/**
 * UPDATE ------
 *  - res : reponse callback
 *  - tablename : nom de la table
 *  - object : objet json bien formé
 *  - id : un id passe dans l'url
 */
var update = function(res, tablename, object, id) {
   dao.query('UPDATE ' + tablename + ' SET ? WHERE id = ?', [object, id], function(err, result) {
      if(err) {
         console.log(err);
         res.status(204);
         return;
      }
      console.log(result);  // JSON.stringify(result) ➜ changer affichage log
      res.json(result);
   }); 
};

/**
 * DELETE ------
 *  - res : reponse callback
 *  - tablename : nom de la table
 *  - id : un id passe dans l'url
 */
var del = function(res, tablename, id) {
   dao.query('DELETE FROM ' + tablename + ' WHERE id = ?', id, function(err, result) {
      if(err) {
         console.log(err);
         res.status(204);
         return;
      }
      console.log(result);  // JSON.stringify(result) ➜ changer affichage log
      res.status(202);
      res.json(result);
   });
};

/*exports.insert = insert;
exports.select = select;
exports.update = update;
exports.del = del;*/

module.exports = {insert: insert, 
                  select: select,
                  update: update,
                  del: del};