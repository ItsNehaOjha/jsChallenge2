let currentTrack = 1;

const tracks = {
    1: {
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        image: 'cover-1.png',
        audioId: 'audio1',
        src: 'lost-in-city-lights-145038.mp3'
    },
    2: {
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        image: 'cover-2.png',
        audioId: 'audio2',
        src: 'forest-lullaby-110624.mp3'
    }
};

const playPauseBtn = document.getElementById('playPauseBtn');
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');
const progressBar = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

function togglePlayPause() {
    const currentAudio = currentTrack === 1 ? audio1 : audio2;

    if (currentAudio.paused) {
        playAudio(currentAudio);
    } else {
        pauseAudio(currentAudio);
    }
}

// Function to play audio
function playAudio(audio) {
    audio.play()
        .then(() => {
            updatePlayPauseButton(true);
            updateProgressBar();
        })
        .catch(error => {
            console.error('Play operation failed:', error);
        });
}

// Function to pause audio
function pauseAudio(audio) {
    audio.pause();
    updatePlayPauseButton(false);
}

function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
        playPauseBtn.innerHTML = '<svg width="32" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.66663 26.6667V5.33334H12.0006V26.6667H6.66663ZM19.3333 5.33334H26.6666V26.6667H19.3333V5.33334Z" fill="#E5E7EB"/></svg>';
    } else {
        playPauseBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.941 14.244L14.119 10.236C12.686 9.50176 11 10.5696 11 12.2115V19.7885C11 21.4304 12.686 22.4982 14.119 21.764L21.941 17.756C23.353 17.0325 23.353 14.9675 21.941 14.244Z" fill="#E5E7EB" /></svg>';
    }
}

function updateProgressBar() {
    const currentAudio = currentTrack === 1 ? audio1 : audio2;
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Update current time
    let currentMinutes = Math.floor(currentAudio.currentTime / 60);
    let currentSeconds = Math.floor(currentAudio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentAudio.duration / 60);
    let durationSeconds = Math.floor(currentAudio.duration - durationMinutes * 60);

    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    duration.textContent = `${durationMinutes}:${durationSeconds}`;

    // Update progress bar on time update
    currentAudio.addEventListener('timeupdate', () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;

        // Update current time
        currentMinutes = Math.floor(currentAudio.currentTime / 60);
        currentSeconds = Math.floor(currentAudio.currentTime - currentMinutes * 60);
        currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    });
}

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const width = progressContainer.clientWidth;
    const duration = currentTrack === 1 ? audio1.duration : audio2.duration;
    const seekTime = (clickX / width) * duration;

    if (currentTrack === 1) {
        audio1.currentTime = seekTime;
    } else {
        audio2.currentTime = seekTime;
    }

    updateProgressBar();
});


function nextTrack() {
    currentTrack = currentTrack === 1 ? 2 : 1;
    updateTrackInfo();
    playCurrentTrack();
}


function previousTrack() {
    currentTrack = currentTrack === 1 ? 2 : 1;
    updateTrackInfo();
    playCurrentTrack();
}


function updateTrackInfo() {
    const { title, artist, image } = tracks[currentTrack];
    document.getElementById('trackTitle').textContent = title;
    document.getElementById('artist').textContent = artist;
    document.getElementById('coverImage').src = image;
}

function playCurrentTrack() {
    const currentAudio = currentTrack === 1 ? audio1 : audio2;

    if (currentTrack === 1) {
        audio2.pause();
        audio1.currentTime = 0;
        playAudio(audio1);
    } else {
        audio1.pause();
        audio2.currentTime = 0;
        playAudio(audio2);
    }

    updateTrackInfo();
}


updateTrackInfo();
updatePlayPauseButton(audio1.paused && audio2.paused);
