app
  .controller('MainController', function ($scope, $http, $routeParams, AuthService) {
    var accessToken = AuthService.getAccessToken();

    $scope.selectUser = function (user) {
      sessionStorage.setItem('selectedUser', JSON.stringify(user));
      sessionStorage.removeItem('selectedChannel');
    };

    $scope.selectChannel = function (channel) {
      sessionStorage.setItem('selectedChannel', JSON.stringify(channel));
      sessionStorage.removeItem('selectedUser');
    };

    $scope.sendMessage = function () {
      let newMessage = $scope.newMessage;
      let selectedUser = sessionStorage.getItem('selectedUser');
      let selectedChannel = sessionStorage.getItem('selectedChannel');
      if (selectedUser) {
        selectedUser = JSON.parse(selectedUser)

        let messageData = {
          message: newMessage,
          toUser: selectedUser._id
        };

        sendMessageToUser(messageData);

      } else if (selectedChannel) {
        selectedChannel = JSON.parse(selectedChannel)
        let messageData = {
          message: newMessage,
          toChannel: selectedChannel._id
        };
        sendMessageToChannel(messageData);
      } else {
        console.error('Failed to send message:');
      }

      $scope.newMessage = '';
    };

    $scope.isMessageFromCurrentUser = function (message) {
      let currentUserUsername = JSON.parse(sessionStorage.getItem('username'));
      return message.from.username === currentUserUsername; // Replace with your username check
    };

    $scope.editMessage = function (message) {
      message.editing = true;
      message.editContent = message.content; // Initialize the edit content with the current content
    };

    $scope.saveMessage = function (message) {
      $http({
        method: 'PUT',
        url: `http://localhost:3000/message/${message._id}`,
        data: { message: message.editContent },
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(function (response) {
        console.log('Edited Successfully')
        message.content = message.editContent;
      }).catch(function (error) {
        console.error('Failed to Edit Message:', error);
      });
      message.editing = false;
    };

    $scope.cancelEdit = function (message) {
      message.editing = false;
    };

    $scope.deleteMessage = function (message) {
      $http({
        method: 'DELETE',
        url: `http://localhost:3000/message/${message._id}`,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then(function (response) {
        $scope.messages = $scope.messages.filter(item => item._id !== message._id)
        console.log('Deleted Successfully')

      }).catch(function (error) {
        console.error('Failed to Delete message:', error);
      });
    };


    $http({
      method: 'GET',
      url: 'http://localhost:3000/channels',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(function (response) {
      $scope.channels = response.data.data;

    }).catch(function (error) {
      console.error('Failed to get channels:', error);
    });

    $http({
      method: 'GET',
      url: 'http://localhost:3000/users',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(function (response) {
      $scope.users = response.data.data;
    }).catch(function (error) {
      console.error('Failed to get users:', error);
    });


    $scope.$watch('$routeParams.channelId', function () {
      if ($routeParams.channelId) {
        let accessToken = AuthService.getAccessToken();

        $http({
          method: 'GET',
          url: 'http://localhost:3000/messages/channel',
          params: {
            channelId: $routeParams.channelId
          },
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }).then(function (response) {
          $scope.messages = response.data.data;
        }).catch(function (error) {
          console.error('Failed to get messages:', error);
        });
      }

      if ($routeParams.userId) {
        let accessToken = AuthService.getAccessToken();
        $http({
          method: 'GET',
          url: 'http://localhost:3000/messages/user',
          params: {
            companionId: $routeParams.userId
          },
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }).then(function (response) {
          $scope.messages = response.data.data;
        }).catch(function (error) {
          console.error('Failed to get messages:', error);
        });
      }
    });

    function sendMessageToUser(messageData) {
      var accessToken = AuthService.getAccessToken();
      $http({
        method: 'POST',
        url: 'http://localhost:3000/message',
        data: messageData,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(function (response) {
          $scope.messages.push(response.data.data);
          console.log('Message sent to user');
        })
        .catch(function (error) {
          console.error('Error sending message to user:', error);
        });
    }

    function sendMessageToChannel(messageData) {
      var accessToken = AuthService.getAccessToken();
      $http({
        method: 'POST',
        url: 'http://localhost:3000/message',
        data: messageData,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(function (response) {
          $scope.messages.push(response.data.data);
          console.log('Message sent to channel');
        })
        .catch(function (error) {
          console.error('Error sending message to channel:', error);
        });
    }

  });