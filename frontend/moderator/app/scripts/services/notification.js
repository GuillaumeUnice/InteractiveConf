'use strict';

/**
 * @ngdoc service
 * @name Moderator.notification
 * @description
 * # notification
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('notification', function ($notification, CONFIG) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {

      writeNotification: function (json) {
          if(json.status !== undefined) {
            var title = json.title ? json.title : "";
            var message = json.message ? json.message : "";

            switch (json.status) {
              case CONFIG.JSON_STATUS_SUCCESS: $notification.success(title, message); break;
              case 200: $notification.success(title, message); break;
              case CONFIG.JSON_STATUS_WARNING: $notification.warning(title, message); break;
              case CONFIG.JSON_STATUS_NOTICE: $notification.info(title, message); break;
              case CONFIG.JSON_STATUS_ERROR: $notification.error(title, message); break;
              case 100: $notification.info(title, message); break;
              case 101: $notification.info(title, message); break;
              case 110: $notification.success(title, message); break;
              case 111: $notification.error(title, message); break;
            }

          } else {
           $notification.success('', 'success');
          }


          return;
      }

    };
  });
