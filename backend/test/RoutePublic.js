/**
 * Created by Romain on 18/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');



describe('Routing test', function () {

    var server = request.agent("http://localhost:3000/api/public");

    var id_created = null;

    before(function (done) {
        done();
    });


    /** ---------------------------------------------------------------------------------------
     *  Test pour les Users
     *  --------------------------------------------------------------------------------------- */

    describe('Public testing', function () {

        var publicBody = {
            "hash_cookie": "cookie",
            "ip": "111.111.111.111",
            "nom": "Test",
            "prenom": "Testing",
            "socket_id": "socket"
        };

        // TEST POST
        it('should correctly post a new user', function (done) {
            server
                .post('/')
                .send(publicBody)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(201) //Status code created
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('insertId');
                    // recupere l'id du post pour tester le get par id
                    id_created = res.body.insertId;
                    done();
                });
        });

        // TEST GET PAR ID
        it('should correctly get a user', function (done) {
            server
                .get("/" + id_created)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('nom');
                    res.body[0].should.have.property('prenom');
                    res.body[0].should.have.property('socket_id');
                    res.body[0].should.have.property('hash_cookie');
                    res.body[0].should.have.property('ip');
                    done();
                });
        });

        // TEST DELETE
        it('should correctly delete a user', function (done) {
            server
                .delete("/private/" + id_created)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(202) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.not.have.property('id');
                    done();
                });
        });

    });


    after(function (done) {
        done();
    });
});
