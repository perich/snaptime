const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 1337;
const staticPath = path.join(__dirname, '/public');

// Config
app.use(express.static(staticPath));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// Routes
app.post('/generateUrl', function(req, res) {
  console.log('the body!!!!!', req.body);
  res.send(JSON.stringify({key: 'hello'}));
})


// Services

// generates unique hashes for p2p sessions
urlHashService = {
  sessions: {},
  generateHash: function () {

  }
}





