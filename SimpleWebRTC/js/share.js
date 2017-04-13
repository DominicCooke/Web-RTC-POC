// local screen obtained
webrtc.on('localScreenAdded', function (video) {
    $('.screen-container')[0].appendChild(video);
    $('.screen-container').show();
});

// local screen removed
webrtc.on('localScreenRemoved', function (video) {
    $('.screen-container')[0].removeChild(video);
    $('.screen-container').hide();
});

$(document).ready(function () {
    var button = $('#screenShareButton')[0];
    setButton = function (bool) {
        button.innerText = bool ? 'share screen' : 'stop sharing';
    };

    webrtc.on('localScreenRemoved', function () {
        setButton(true);
    });

    setButton(true);

    button.onclick = function () {
        if (webrtc.getLocalScreen()) {
            webrtc.stopScreenShare();
            setButton(true);
            $('.screen-container').empty();
            $('.screen-container').hide();
        } else {
            webrtc.shareScreen(function (err) {
                if (err) {
                    alert("You need the chrome extension!")
                    setButton(true);
                } else {
                    setButton(false);
                }
            });

        }
    };

});


