function showVolume(el, volume) {
    if (!el) return;
    if (volume < -45) volume = -45; // -45 to -20 is
    if (volume > -20) volume = -20; // a good range
    el.value = volume;
}

// we got access to the camera
webrtc.on('localStream', function (stream) {
    $('#localVolume').show();
});

// we did not get access to the camera
webrtc.on('localMediaError', function (err) {
    alert("Couldn't get access to a camera");
});

// a peer video has been added
webrtc.on('videoAdded', function (video, peer) {
    console.log('video added', peer);
    var webcamArea = $('.webcam-area')[0];
    if (webcamArea) {
        var container = document.createElement('div');
        container.className = 'peer video-container';
        container.id = 'container_' + webrtc.getDomId(peer);
        container.appendChild(video);

        // show the remote volume
        var vol = document.createElement('meter');
        vol.id = 'volume_' + peer.id;
        vol.className = 'volume';
        vol.min = -45;
        vol.max = -20;
        vol.low = -40;
        vol.high = -25;
        container.appendChild(vol);

        webcamArea.appendChild(container);
    }
});

// a peer was removed
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var webcamArea = $('.webcam-area')[0];
    var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
    if (webcamArea && el) {
        webcamArea.removeChild(el);
    }
});

// local volume has changed
webrtc.on('volumeChange', function (volume, treshold) {
    showVolume($('#localVolume')[0], volume);
});

// remote volume has changed
webrtc.on('remoteVolumeChange', function (peer, volume) {
    showVolume($('#volume_' + peer.id)[0], volume);
});

// local p2p/ice failure
webrtc.on('iceFailed', function (peer) {
    var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
    console.log('local fail', connstate);
    if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
    }
});

// remote p2p/ice failure
webrtc.on('connectivityError', function (peer) {
    var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
    console.log('remote fail', connstate);
    if (connstate) {
        connstate.innerText = 'Connection failed.';
        fileinput.disabled = 'disabled';
    }
});
