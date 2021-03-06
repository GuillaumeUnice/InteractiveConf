'use strict';

/**
 * @ngdoc service
 * @name Public.questionsService
 * @description
 * # questionsService
 * Service in the Public.
 */

angular.module('Public')
    .factory('QuestionsService', function (CONFIG, $resource, UserService) {
        return $resource(CONFIG.baseUrlApi + '/question/validInfo/'+UserService.get().id, {},
        {
            'get':    { method: 'GET', isArray:true },
            'query':  { method: 'GET', isArray:true },
            'save':   { method: 'POST' },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    });
