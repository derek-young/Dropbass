(function() {
  const PLAYER = angular.module('blues.player', []);

  PLAYER.controller('PlayerController', function ($scope, Request, Auth) {
    $scope.songs = {};
    $scope.songSelected = false;

    Request.get('/api/songs').then((res) => {
      $scope.scrub(res.data.entries);
      $scope.songs = res.data.entries;
    });

    $scope.selectSong = (id) => {
      const url = '/dropbox/' + id;
      const audio = document.getElementById('audio-player');
      audio.pause();
      audio.src = url;
      audio.oncanplay = $scope.playAudio();
    };

    $scope.playAudio = () => {
      const audio = document.getElementById('audio-player');
      $scope.songSelected = true;
      audio.play();
    };

    $scope.scrub = (songs) => {
      angular.forEach(songs, function(song) {
        const mp3Ext = song.name.indexOf('.mp3');
        if (mp3Ext >= 0) {
          const split = song.name.substring(0, mp3Ext).split('.');
          const artistTitle = songs[0].path_display.split('/')[2].split('-');
          const album = artistTitle.pop();
          const artist = artistTitle.join(' ');

          song.album = album;
          song.artist = artist;
          song.trackNumber = split[0];
          song.cleanName = split[1];
        }
      });
    };

    $scope.signout = Auth.signout;
  });

  PLAYER.filter('songFilter', function() {
    return (songs) => {
      const results = [];

      angular.forEach(songs, function(song) {
        if (song.name && song.name.indexOf('.mp3') >=0) {
          return results.push(song);
        }
      });

      return results;
    }
  });
})();
