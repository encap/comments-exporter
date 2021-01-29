const express = require('express');

const app = express();
const http = require('http').Server(app);

const getComments = require('./getComments.js');
require('dotenv').config({ path: `${__dirname}/./../.env.local` });

debugger;
app.get('/', getComments);

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Server listening on port ${PORT}!`);
});
