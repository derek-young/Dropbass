(function() {
  const PLAYER = angular.module('blues.player', []);

  PLAYER.controller('PlayerController', function ($scope, Songs, Auth) {
    $scope.albums = {};

    Songs.getSongs().then((res) => {
      console.log(res);
    });

    $scope.songSelected = false;
    $scope.currentSongURL = null;

    $scope.selectSong = (url) => {
      $scope.songSelected = true;
      $scope.currentSongURL = url;
      $scope.playAudio();
    };

    $scope.playAudio = () => {
      const audio = document.getElementById('audio-player');
      audio.src = $scope.currentSongURL;
      audio.play();
    };

    $scope.signout = Auth.signout;
  });

  PLAYER.factory('Songs', function($http) {
    return {
      getSongs: () => {
        return $http({
          method: 'GET',
          url: '/api/songs'
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw err;
        });
      }
    }

    // return {
    //   albums: [
    //     {
    //       artist: 'Zeds Dead & Omar LinX',
    //       album: 'Victor',
    //       albumArt: '/lib/music/Folder.jpg',
    //       songs: [
    //         {
    //           title: 'No Prayers',
    //           url: '/lib/music/01.NoPrayers.mp3'
    //         },
    //         {
    //           title: 'The One',
    //           url: '/lib/music/02.The One.mp3'
    //         },
    //         {
    //           title: 'You and I',
    //           url: '/lib/music/04.You and I.mp3'
    //         }
    //       ]
    //     }
    //   ]
    // }
  });
})();
