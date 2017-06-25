const Peer = SimplePeer;

const p = new Peer({ initiator: location.hash === '#1', trickle: false })

const serverUrl = 'http://localhost:1337';

var host = {};

// get user's camera and mic data, then pass that data to gotMedia() 
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => gotMedia(stream)).catch(err => console.log(err));

// Setup DOM event handlers
const urlBtn = $('#urlGenerator');
const toggleMediaBtn = $('#toggleMediaStream');
const form = $('form').first();

urlBtn.click(() => {
  xhr.getNewUrl(host.signal)
    .done(xhr.handleSuccess, (data) => {
      // append the new URL generated from server so user can copy/paste it
      $('#generatedUrl').val(data.urlHash); 
    })
    .fail(xhr.handleError)
})

toggleMediaBtn.click((e) => {
  $('#video').toggle();
})

$('form').first().submit(ev => {
  ev.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value));
})


// Setup WebRTC p2p handlers
p.on('error', error => console.log('error: ', error));

p.on('signal', data => {
  console.log(data);
  host.signal = data;
});
 
p.on('data', data => console.log('data: ' + data));

p.on('connect', () => {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
});

p.on('stream', stream => {
  // got remote video stream, now let's show it in an HTML video tag 
  var video = $('video')[0];
  video.src = window.URL.createObjectURL(stream)
  video.play()
})
 
// All functions defined at bottom of file
function gotMedia (stream) {
    const video = $('video')[0];

    video.muted = true;
    video.src = window.URL.createObjectURL(stream);
    video.play().then(trackFace).catch(error => console.log(error));
}

function trackFace () {
    // const ctracker = new clm.tracker();
    // const canvasInput = $('#drawCanvas')[0];
    // const cc = canvasInput.getContext('2d');

    // ctracker.init(pModel);
    // ctracker.start(video);

    // (function drawLoop() {
    //   // array of coordinates for facial features
    //   const positions = ctracker.getCurrentPosition();

    //   requestAnimationFrame(drawLoop);
    //   cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
    //   ctracker.draw(canvasInput);
    // })();
}