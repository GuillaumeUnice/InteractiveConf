

var constants = require('../our_modules/constants');
var Twitter = require('twitter'); // "twitter": "~1.2.5"
//var request = require('request');

//var io = require('socket.io').listen(app.listen(port));
// var io = require('socket.io').listen(3001);

// io.sockets.on('connection', function (socket) {
//     console.log('client connected');
//     socket.broadcast.emit('the test connect');
    /*socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });*/
// });

/**
 * Config Twitter app
 */

var configTwitter = {
    consumer_key: 'SsCYo1yut3kOhIT0lj4dlxSEB',
    consumer_secret: 'XmcnhfXkc5tpMKqfEjtstLVXrvi5hdkBnWo4nMVbry6pCRPBYR',
    access_token_key: '3139797719-KRjh3kOz8A9AXPAckorepMOSr3y8k2Fy731EM2M',
    access_token_secret: '8tzyJfKbfE8sicNO0jCopo9MU2H0MjKXfAtaixRoHQCem'
};

var client = new Twitter(configTwitter);

// var startTrack = function(Keywords) {
var startTrack = function() {

    // var params = {track: Keywords};
    var params = {track: '#love'};

    client.stream('statuses/filter', params, function(stream) {
        stream.on('data', function(tweet) {
            //console.log(tweet.text);
            mySocket.sendByNamespace(constants.MODERATOR_NAMESPACE, constants.NAMESPACE_RESOURCE_TWEET, tweet); 
            //io.sockets.emit('newtweet', tweet);

        });

        stream.on('error', function(error) {
            console.log('tweetTracker Error :')
            console.log(error)
            //throw error;
        });
    });
}

exports.startTrack = startTrack;