const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 1337;
const staticPath = path.join(__dirname, '/public');

// Config
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// Routes
app.post('/generateUrl', function(req, res) {
  console.log('the body!!!!!', req.body);
  const urlHash = urlService.generateHash();

  res.send(JSON.stringify({urlHash: urlHash}));
})

app.get('/sessions/:hash', function(req, res) {
  const hash = req.params.hash;
  var session = urlService.session[hash];

  if (session && session.isJoinable) {
    // this is a valid session, join user
  } else if (session && !session.isJoinable) {
    // the room is full, sorry
    // redirect to homepage
  } else {
    // invalid session hash, serve 404
  }
});


// Services

// generates URLs with unique hashes for p2p data transfer sessions
urlService = {

  sessions: {},

  generateHash: function () {
    var hash = String(Math.floor(Math.random() * 1000));

    // safeguard from accidentally creating two sessions with same hash
    if (this.sessions[hash]) {
      return this.generateHash();
    } else {
      this.sessions[hash] = {
        isJoinable: true
      };

      return hash;
    }
  }

}





