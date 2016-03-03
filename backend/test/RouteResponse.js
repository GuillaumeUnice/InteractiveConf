/**
 * Created by Romain on 18/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');



describe('Routing test', function () {

    var server = request.agent("http://localhost:3010/api/response");

    var id_created = null;

    before(function (done) {
        done();
    });


    /** ---------------------------------------------------------------------------------------
     *  Test pour les Responses
     *  --------------------------------------------------------------------------------------- */

    describe('Response testing', function () {

        var responseBody = {
            "question_id": 2,
            "content": "Reponse a la question !"
        };

        // TEST POST
        it('should correctly post a new response', function (done) {
            server
                .post('/')
                .send(responseBody)
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

        // TEST POST FAIL
        it('should not correctly post a new response', function (done) {
            var newRep = responseBody;
            newRep.question_id = 888;

            server
                .post('/')
                .send(newRep)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(404) //Status code created
                .end(done());
        });

        // TEST GET PAR ID
        it('should correctly get a response', function (done) {
            server
                .get("/" + id_created)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('content');
                    res.body[0].should.have.property('question_id');
                    done();
                });
        });

        // TEST GET PAR ID TABLEAU VIDE
        it('should not correctly get a response with bad id', function (done) {
            server
                .get("/" + 888)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.length.should.equal(0);
                    done();
                });
        });

        // TEST DELETE
        it('should correctly delete a response', function (done) {
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

        // TEST DELETE ERROR
        it('should not correctly delete a response', function (done) {
            id_created = 4;
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
