const rp = require('request-promise');

endpoint = 'http://my.matrix.com:8008/_matrix/client/r0/register?kind=user';

username = process.argv[2];
password = process.argv[3];

async function run() {
  stage1Response = await stage1Request();

  const sessionId = stage1Response.body.session;
  stage2Response = await stage2Request(sessionId);

  console.log(stage2Response);
}

async function stage1Request() {
  try {
    // Returns 401 unauthorized
    await rp.post(endpoint, {
      json: true,
      body: {}
    });
  } catch(e) {
    // This is success.
    return e.response;
  }
}

async function stage2Request(sessionId) {
  response = await rp.post(endpoint, {
    json: true,
    body: {
        "auth": {
          "session": sessionId,
          "type": "m.login.dummy"
        },
        "kind": "user",
        username,
        password,
        "initial_device_display_name": "nodescript"
    }
  });
  return response;
}

run()