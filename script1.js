const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const album = document.getElementById('album');

const songs = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        album: 'Album 1',
        src: 'path/to/song1.mp3'
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        album: 'Album 2',
        src: 'path/to/song2.mp3'
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        album: 'Album 3',
        src: 'path/to/song3.mp3'
    }
];

let currentSongIndex = 0;

const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    album.textContent = song.album;
    audio.src = song.src;
};

const playPause = () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
};

const updateProgress = () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
};

const setProgress = (e) => {
    const newTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = newTime;
};

const setVolume = (e) => {
    audio.volume = e.target.value;
};

const prevSong = () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
};

const nextSong = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
};

const renderPlaylist = () => {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('playlist-item');
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(song);
            audio.play();
        });
        playlist.appendChild(songItem);
    });
};

audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
volume.addEventListener('input', setVolume);
playPauseBtn.addEventListener('click', playPause);
document.getElementById('prev').addEventListener('click', prevSong);
document.getElementById('next').addEventListener('click', nextSong);

loadSong(songs[currentSongIndex]);
renderPlaylist();
