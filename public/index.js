const Peer = SimplePeer;

const p = new Peer({ initiator: location.hash === '#1', trickle: false })

const serverUrl = 'http://localhost:1337';

var xhr = {
  handleSuccess: function (data) {
    console.log('XHR successful');
    console.log(data);
  },

  handleError: function (obj, text, error) {
    console.log('XHR error');
    console.log(error);
  },

  getNewUrl: function (hostSignalObj) {
    return $.ajax({
      type: 'POST',
      url: `${serverUrl}/generateUrl`,
      data: JSON.stringify(hostSignalObj),
      contentType: 'application/json',
      dataType: 'json'
    });
  }
};

var host = {};

(function init () {
  p.on('error', function (err) { console.log('error', err) });
 
  p.on('signal', function (data) {
    host.signal = data;
  });

  const urlBtn = $('#urlGenerator');
  const toggleMediaBtn = $('#toggleMediaStream');

  urlBtn.click(() => {
    xhr.getNewUrl(host.signal)
      .done(xhr.handleSuccess)
      .fail(xhr.handleError)
  })

  toggleMediaBtn.click((e) => {
    $('#video').toggle();
  })

})()

 
document.querySelector('form').addEventListener('submit', function (ev) {
  ev.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value))
})
 
p.on('connect', function () {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})
 
p.on('data', function (data) {
  console.log('data: ' + data)
})

p.on('stream', function (stream) {
  // got remote video stream, now let's show it in a video tag 
  var video = document.querySelector('video')
  video.src = window.URL.createObjectURL(stream)
  video.play()
})

navigator.getUserMedia({ video: true, audio: true }, gotMedia, function () {})
 
function gotMedia (stream) {
  var peer1 = new Peer({ initiator: true, stream: stream })
  var peer2 = new Peer()
 
  peer1.on('signal', function (data) {
    peer2.signal(data)
  })
 
  peer2.on('signal', function (data) {
    peer1.signal(data)
  })
 
  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag 
    var video = document.querySelector('video');
    var ctracker = new clm.tracker();
    ctracker.init(pModel);
  
    video.src = window.URL.createObjectURL(stream);
    video.play().then(() => {

      setTimeout(() => {
        ctracker.start(video);
          var canvasInput = document.getElementById('drawCanvas');
          var cc = canvasInput.getContext('2d');
          function drawLoop() {
            requestAnimationFrame(drawLoop);
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            ctracker.draw(canvasInput);
          }
          drawLoop();
      }, 5000)
      
    }).catch((error) => {
      console.log(error);
    });

    (function positionLoop() {
      requestAnimationFrame(positionLoop);
      var positions = ctracker.getCurrentPosition();
      // positions = [[x_0, y_0], [x_1,y_1], ... ]
      // do something with the positions ...
      console.log(positions);
    })();

  })
}