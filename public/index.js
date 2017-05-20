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

  var urlButton = $('#urlGenerator');

  urlButton.click(() => {
    xhr.getNewUrl(host.signal)
      .done(xhr.handleSuccess)
      .fail(xhr.handleError)
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

// navigator.getUserMedia({ video: true, audio: true }, gotMedia, function () {})
 
// function gotMedia (stream) {
//   var peer1 = new Peer({ initiator: true, stream: stream })
//   var peer2 = new Peer()
 
//   peer1.on('signal', function (data) {
//     peer2.signal(data)
//   })
 
//   peer2.on('signal', function (data) {
//     peer1.signal(data)
//   })
 
//   peer2.on('stream', function (stream) {
    // // got remote video stream, now let's show it in a video tag 
    // var video = document.querySelector('video')
    // video.src = window.URL.createObjectURL(stream)
    // video.play()
//   })
// }