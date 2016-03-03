function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("JWT_SECRET", 'ksejrgkjrggrdjkjsfhshjjhsfbhjshbskbd');

define("CHAIRMAN_NAMESPACE", 'chairman');
define("PUBLIC_NAMESPACE", 'public');
define("SCREEN_NAMESPACE", 'screen');
define("SPEAKER_NAMESPACE", 'speaker');
define("MODERATOR_NAMESPACE", 'moderator');

define("PUBLIC_ROLE",  0);
define("MODERATOR_ROLE",  10);
define("CHAIRMAN_ROLE",  15);
define("SPEAKER_ROLE",  20);

define("JSON_STATUS_SUCCESS", 1);
define("JSON_STATUS_WARNING", -1);
define("JSON_STATUS_NOTICE", 0);
define("JSON_STATUS_ERROR", -2);

define("NAMESPACE_RESOURCE_QUESTION", 'question');
define("NAMESPACE_RESOURCE_SONDAGE", 'sondage');
define("NAMESPACE_RESOURCE_NOTE", 'note');
define("NAMESPACE_RESOURCE_TWEET", 'tweet');
define("NAMESPACE_RESOURCE_VOTE", 'vote');
define("NAMESPACE_RESOURCE_FAVORITE", 'favorite');

define("QUESTION_STATUS_CREATED", 0);
define("QUESTION_STATUS_VALIDATED", 5);
define("QUESTION_STATUS_DELETED", 10);
define("QUESTION_STATUS_IGNORED", 11);
define("QUESTION_STATUS_MERGED", 15);
define("QUESTION_STATUS_ANSWERED", 20);
define("QUESTION_STATUS_SENT", 25);
define("QUESTION_STATUS_DISPLAYED", 30);


