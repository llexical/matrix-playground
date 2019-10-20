const rp = require('request-promise');

const endpoint = 'http://my.matrix.com:8008/_matrix/client/r0/publicRooms';

async function run() {
  const response = await rp.get(`${endpoint}`);

  console.log(response);
}

run()