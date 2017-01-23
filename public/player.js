(function() {
  const PLAYER = angular.module('blues.player', []);

  PLAYER.controller('PlayerController', function ($scope, Songs) {
    $scope.albums = Songs.albums;
    $scope.songSelected = false;
    $scope.select = () => {
      $scope.songSelected = true;
      console.log();
    }
  });

  PLAYER.factory('Songs', function() {
    return {
      albums: [
        {
          artist: 'Zeds Dead & Omar LinX',
          album: 'Victor',
          albumArt: '/lib/music/Folder.jpg',
          songs: [
            {
              title: 'No Prayers',
              url: '/lib/music/01.No Prayers.mp3'
            },
            {
              title: 'The One',
              url: '/lib/music/02.The One.mp3'
            },
            {
              title: 'You and I',
              url: '/lib/music/04.You and I.mp3'
            }
          ]
        }
      ]
    }
  });
})();
