const {login} = require('./api');

username = process.argv[2];
password = process.argv[3];

async function run() {
  response = await login(username, password);
  console.log(response);
}

run()