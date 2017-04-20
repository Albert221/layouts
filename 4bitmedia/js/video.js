var video = document.getElementById('video');

// Defered video loading
video.setAttribute('src', video.getAttribute('data-src'));
video.load();
video.play();

document.getElementById('play').addEventListener('click', function() {
    this.blur();

    if (video.muted) {
        video.muted = false;
        this.innerHTML = '<i class="fa fa-volume-up hero--play-icon" aria-hidden="true"></i><span class="hero--play-text">wyłącz dźwięk</span>';
    } else {
        video.muted = true;
        this.innerHTML = '<i class="fa fa-volume-off hero--play-icon" aria-hidden="true"></i><span class="hero--play-text">włącz dźwięk</span>';
    }
});