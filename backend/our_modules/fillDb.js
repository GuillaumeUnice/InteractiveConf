/**
 * Created by Romain on 06/12/2015.
 * Module pour remplir les tables de la BD pfe
 */

/* Table user, 0:public, 5:moderateurs, 10:assistant, 15:conferencier */
var users = [
	{
		"pseudo": "Pena",
		"role": 0,
		"socket_id": "56643717688122d0e6d372c9"
	},
	{
		"pseudo": "Lang",
		"role": 0,
		"socket_id": "56643717576152991b27522b"
	},
	{
		"pseudo": "Lawson",
		"role": 0,
		"socket_id": "566437179228cafb13c460ba"
	},
	{
		"pseudo": "Strickland",
		"role": 0,
		"socket_id": "56643717e931b7119eee7587"
	},
	{
		"pseudo": "Nielsen",
		"role": 0,
		"socket_id": "566437171a95574bf36f5a94"
	},
	{
		"pseudo": "Baker",
		"role": 0,
		"socket_id": "566437174dfce421343ac8b2"
	},
	{
		"pseudo": "Campbell",
		"role": 5,
		"socket_id": "56643717a14a98713d8fedab"
	},
	{
		"pseudo": "Michael",
		"role": 5,
		"socket_id": "56643717a0920b701b718600"
	},
	{
		"pseudo": "Dillon",
		"role": 10,
		"socket_id": "566437170f1c27207770d91b"
	},
	{
		"pseudo": "Parsons",
		"role": 15,
		"socket_id": "56643717a73f4fc1fde61c74"
	}
];
var newUser = {
	"pseudo": "MaxouPixou",
	"role": 0,
	"socket_id": "56643717688122d0e6daaaaa"
};

/* Table questions */
var questions = [
  {
    "content": "Qui nisi fugiat ea exercitation velit officia elit in sunt ex?",
    "status_code": 15,
    "user_id": 5,
	"response_id": 1,
	"slide_start": 2,
	"slide_stop": 2
  },
  {
    "content": "Et laborum enim amet excepteur sunt?",
    "status_code": 25,
    "user_id": 1,
	"response_id": 1,
	"slide_start": 18,
	"slide_stop": 20
  },
  {
    "content": "Sunt esse amet nostrud commodo consectetur consequat fugiat do cupidatat?",
    "status_code": 5,
    "user_id": 5,
	"response_id": 3,
	"slide_start": 20,
	"slide_stop": 20
  },
  {
    "content": "Culpa cupidatat ipsum aute cillum dolore amet ullamco esse culpa aute dolor non exercitation?",
    "status_code": 5,
    "user_id": 4,
	"response_id": 3,
	"slide_start": 38,
	"slide_stop": 38
  },
  {
    "content": "Dolor deserunt commodo reprehenderit aute minim ex tempor eiusmod ullamco elit eu consequat sit?",
    "status_code": 25,
    "user_id": 6,
	"response_id": 4,
	"slide_start": 4,
	"slide_stop": 8
  },
  {
    "content": "Commodo est exercitation cillum id ex do cupidatat cillum?",
    "status_code": 15,
    "user_id": 1,
	"response_id": 5,
	"slide_start": 4,
	"slide_stop": 4
  },
  {
    "content": "Officia reprehenderit sunt laborum consectetur ad esse ea qui aliqua ipsum cupidatat?",
    "status_code": 20,
    "user_id": 1,
	"response_id": 0,
	"slide_start": 7,
	"slide_stop": 7
  },
  {
    "content": "Labore eu cupidatat fugiat irure laboris eu?",
    "status_code": 15,
    "user_id": 6,
	"response_id": 0,
	"slide_start": 35,
	"slide_stop": 35
  },
  {
    "content": "Et sint tempor mollit nisi et exercitation exercitation ad non occaecat consectetur?",
    "status_code": 20,
    "user_id": 3,
	"response_id": 0,
	"slide_start": 23,
	"slide_stop": 26
  },
  {
    "content": "Minim irure eiusmod nostrud fugiat cupidatat elit velit?",
    "status_code": 20,
    "user_id": 6,
	"response_id": 0,
	"slide_start": 22,
	"slide_stop": 23
  }
];
var newQuestion = {
    "content": "De quelle couleur est le cheval blanc d'Henri IV?",
    "status_code": 15,
    "user_id": 11,
	"response_id": null,      /* TODO updater cette valeur avec l'id de la reponse */
	"slide_start": 2,
	"slide_stop": 2
};

/* Table responses */
var responses = [
	{
		"content": "Laboris eiusmod cupidatat reprehenderit proident."
	},
	{
		"content": "Ipsum ad qui aliqua mollit sint sunt minim velit et."
	},
	{
		"content": "Anim deserunt commodo consequat cillum eiusmod occaecat proident ut eu excepteur."
	},
	{
		"content": "Do cillum excepteur consectetur pariatur fugiat consequat laborum ullamco irure labore sint."
	},
	{
		"content": "Esse adipisicing minim velit aliquip dolor qui excepteur pariatur laborum amet aliqua non laborum."
	}
];
var newResponse = {
    "content": "Il est blanc Maxou!"
};

/**
 * GETTERS
 */
var getUsers = function() {
	return users;
}
var getNewUser = function() {
	return newUser;
}
var getQuestions = function() {
	return questions;
}
var getNewQuestion = function() {
	return newQuestion;
}
var getResponses = function() {
	return responses;
}
var getNewResponse = function() {
	return newResponse;
}

exports.getUsers = getUsers;
exports.getNewUser = getNewUser;
exports.getQuestions = getQuestions;
exports.getNewQuestion = getNewQuestion;
exports.getResponses = getResponses;
exports.getNewResponse = getNewResponse;