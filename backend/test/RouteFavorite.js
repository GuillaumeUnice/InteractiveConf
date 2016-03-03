/**
 * Created by yazide on 01/03/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');



describe('Routing test', function () {

    var server = request.agent("http://localhost:3010/api/favorite");

    before(function (done) {
        done();
    });


    /** ---------------------------------------------------------------------------------------
     *  Test pour les Favorites
     *  --------------------------------------------------------------------------------------- */

    describe('Favorite testing', function () {

        var FavoriteBody = {
            "public_id": 12,
            "question_id": 290
        };

        // TEST POST
        it('should correctly post a new Favorite', function (done) {
            server
                .post('/sendToFavorite')
                .send(FavoriteBody)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(201) //Status code created
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('insertId');
                    // recupere l'id du post pour tester le get par id
                    done();
                });
        });

        // TEST POST FAIL
        it('should not correctly post a new Favorite', function (done) {
            server
                .post('/sendToFavorite')
                .send(FavoriteBody)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(201) //Status code created
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('insertId');
                    // recupere l'id du post pour tester le get par id
                    done();
                });
        });

        // TEST GET PAR ID USER
        it('should correctly get a Favorite From User ID', function (done) {
            server
                .get("/" + FavoriteBody.public_id)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('questionid');
                    res.body[0].should.have.property('public_id');
                    res.body[0].should.have.property('nom');

                    done();
                });
        });

        // TEST GET PAR ID QUESTION
        it('should correctly get a Favorite From Question ID', function (done) {
            server
                .get("/newFavorite/" + FavoriteBody.question_id)
                .expect('Content-type', 'application/json; charset=utf-8')
                .expect(200) //Status code success
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('public_id');
                    res.body[0].should.have.property('nom');
                    res.body[0].should.have.property('content');
                    res.body[0].should.have.property('status_code');
                    res.body[0].should.have.property('up_vote');

                    done();
                });
        });
    });

        after(function (done) {
            done();
        });


    });