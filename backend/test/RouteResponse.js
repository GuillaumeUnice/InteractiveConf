/**
 * Created by Romain on 18/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');



describe('Routing test', function () {

    var server = request.agent("http://localhost:3000/api/response");

    var id_created = null;

    before(function (done) {
        done();
    });


    /** ---------------------------------------------------------------------------------------
     *  Test pour les Responses
     *  --------------------------------------------------------------------------------------- */

    describe('Response testing', function () {

        var responseBody = {
            "question_id": 1,
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

    });


    after(function (done) {
        done();
    });
});
