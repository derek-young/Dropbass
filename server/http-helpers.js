const request = require('request');
const key = require('./config.js');

module.exports.getSongs = (res) => {
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
