const rp = require('request-promise');

const endpoint = 'http://my.matrix.com:8008/_matrix/client/r0';

async function login(username, password) {
  return rp.post(`${endpoint}/login`, {
    json: true,
    body: {
      "identifier": {
        "type": "m.id.user",
        "user": username
      },
      "initial_device_display_name": "nodescript",
      "password": password,
      "type": "m.login.password"
    }
  });
}

module.exports = {
  login,
}