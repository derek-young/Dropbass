const request = require('request');
const progress = require('progress-stream');
const key = require('./config.js');

module.exports.download = (path, res) => {
  const stream = progress({
    time: 1000
  });
  let contentType = 'image/jpeg';
  if (path.includes('id:')) {
    contentType = 'audio/mpeg';
    path = path.substring(1, path.length);
    console.log(path);
  }

  res.setHeader('Content-Type', contentType);
  const options = {
    method: 'POST',
    url: 'https://content.dropboxapi.com/2/files/download',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Dropbox-API-Arg': JSON.stringify({path: path})
    }
  };

  stream.on('progress', function(progress) {
    console.log(Math.round(progress.percentage)+'%');
    console.log('Transferred: ', progress.transferred);
  });

  request(options).pipe(stream).pipe(res);
};

module.exports.getSongs = (res) => {
  res.setHeader('Content-Type', 'application/json');
  const options = {
    method: 'POST',
    url: 'https://api.dropboxapi.com/2/files/list_folder',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "path": "/Music/Zeds-Dead-Omar-LinX-Victor",
      "recursive": false,
      "include_media_info": false,
      "include_deleted": false,
      "include_has_explicit_shared_members": false
    })
  };

  request(options, function(err, response, body) {
    res.send(body);
  });
};
