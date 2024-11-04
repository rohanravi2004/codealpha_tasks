const songs = [
    { title: "Song 1 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3" },
    { title: "Song 2 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-goinghigher.mp3" },
    { title: "Song 3 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-today.mp3" },
    { title: "Song 4 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-adventure.mp3" },
    { title: "Song 5 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3" },
    { title: "Song 6 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-funkybusiness.mp3" },
    { title: "Song 7 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-epic.mp3" },
    { title: "Song 8 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3" },
    { title: "Song 9 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-memories.mp3" },
    { title: "Song 10 - Ketsa", src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const search = document.getElementById('search');

function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.onclick = () => playSong(index);
        playlist.appendChild(li);
    });
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].src;
    audio.play();
    document.getElementById('play').style.display = 'none';
    document.getElementById('pause').style.display = 'inline';
}

function filterSongs() {
    const query = search.value.toLowerCase();
    const items = playlist.getElementsByTagName('li');
    let found = false;

    // Clear previous messages
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.textContent.toLowerCase().includes(query)) {
            item.style.display = '';
            found = true;
        } else {
            item.style.display = 'none';
        }
    }

    // Show a message if no songs were found
    if (!found && query) {
        const message = document.createElement('li');
        message.textContent = 'Sorry, no songs found!';
        message.style.color = 'red';
        message.className = 'message'; // Assign a class for easier removal
        message.style.listStyle = 'none';
        playlist.appendChild(message);
    }
}

document.getElementById('play').onclick = () => audio.play();
document.getElementById('pause').onclick = () => audio.pause();
document.getElementById('prev').onclick = () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
};
document.getElementById('next').onclick = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
};
document.getElementById('volume').oninput = (e) => {
    audio.volume = e.target.value;
};

audio.onended = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
};

loadPlaylist();
