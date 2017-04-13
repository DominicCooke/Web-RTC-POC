// grab the room from the URL
var room = location.search && location.search.split('?')[1];

// create our webrtc connection
var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: '',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
    url: 'https://localhost:8888'
});

// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function () {
    // you can name it anything
    if (room) webrtc.joinRoom(room);
});

$(document).ready(function () {
    if (room)
        setRoom(room);
});

// Since we use this twice we put it here
function setRoom(name) {
    $('#createRoom')[0].remove();
    $('#formSubmit')[0].remove();
    $('#title')[0].innerText = 'Room: ' + name;
    $('#subTitle')[0].innerText = 'Link to join: ' + location.href;
    $('body').addClass('active');
}

function createRoom() {
    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
    webrtc.createRoom(val, function (err, name) {
        console.log(' create room cb', arguments);

        var newUrl = location.pathname + '?' + name;
        if (!err) {
            history.replaceState({
                foo: 'bar'
            }, null, newUrl);
            setRoom(name);
        } else {
            console.log(err);
        }
    });
}
