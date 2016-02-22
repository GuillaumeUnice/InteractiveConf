/**
 * Created by Romain on 18/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');



describe('Routing test', function () {

    var server = request.agent("http://localhost:3000/api/question");

    var id_created = null;

    before(function (done) {
        done();
    });


    /** ---------------------------------------------------------------------------------------
     *  Test pour les Questions
     *  --------------------------------------------------------------------------------------- */

    describe('Question testing', function () {

        var questionBody = {
            "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit ?",
            "status_code": 25,
            "public_id": 1,
            "num_slide": 5,
            "up_vote": 0,
            "question_id": null
        };

        // TEST POST
        it('should correctly post a new question', function (done) {
            server
                .post('/')
                .send(questionBody)
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
        it('should correctly get a question', function (done) {
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
                    res.body[0].should.have.property('status_code');
                    res.body[0].should.have.property('public_id');
                    res.body[0].should.have.property('num_slide');
                    res.body[0].should.have.property('up_vote');
                    res.body[0].should.have.property('question_id');
                    done();
                });
        });

        // TEST PUT
        it('should correctly update a question', function (done) {
            questionBody.content = 'Contenu nouveau';
            questionBody.status_code = 20;
            server
                .put("/" + id_created)
                .send(questionBody)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.insertId.should.equal(0);
                    res.body.affectedRows.should.equal(1);
                    done();
                });
        });

        // TEST DELETE
        it('should correctly delete a question', function (done) {
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
