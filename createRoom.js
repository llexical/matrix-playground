const rp = require('request-promise');
const slugify = require('slugify')

const {login} = require('./api');

const endpoint = 'http://my.matrix.com:8008/_matrix/client/r0/createRoom';

const username = process.argv[2];
const password = process.argv[3];
const roomName = process.argv[4];
const visibility = process.argv[5] || "public"; // Not required - default "public"
const topic = process.argv[6]; // Not required - default ""

async function run() {
  const {access_token} =  await login(username, password);

  const response = await rp.post(`${endpoint}?access_token=${access_token}`, {
    json: true,
    body: {
      "creation_content": {
        "m.federate": false
      },
      "name": roomName,
      "preset": `${visibility}_chat`,
      "room_alias_name": slugify(roomName),
      topic,
      "visibility": visibility || "public"
    }
  });

  console.log(response);
}

run()