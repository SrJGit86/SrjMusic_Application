console.log("Wellcome to JavaScript");

let songIndex = 0;
let audioSong = new Audio("songs/1.mp3");
// audioSong.play();
let playBtn = document.getElementById("play_btn");
let myProgressBar = document.getElementById("songProgress");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("currentSong");
let bigCover = document.getElementById("bigCover");
let bigCoverInfo = document.getElementById("bigCoverInfo");
let currTime = document.getElementById("currTime");
let fullSongTime = document.getElementById("fullSongTime");
let songElements = Array.from(document.getElementsByClassName("songs"));


let songs = [
    { songName: "Superfast Breathless Hanuman Chalisa", songDuration: "03:48", filePath: "./songs/1.mp3", coverPath: "./images/1.jpg" },
    { songName: "Yeh Sham Mastani-Kati Patang", songDuration: "04:41", filePath: "./songs/2.mp3", coverPath: "./images/2.jpg" },
    { songName: "Ude Jab Jab Zulfein Teri - Naya Daur", songDuration: "06:24", filePath: "./songs/3.mp3", coverPath: "./images/3.jpg" },
    { songName: "Tere Chehre Main Woh - Dharmatma", songDuration: "04:18", filePath: "./songs/4.mp3", coverPath: "./images/4.jpg" },
    { songName: "Gali Mein Aaj Chand Nikla", songDuration: "05:07", filePath: "./songs/5.mp3", coverPath: "./images/5.jpg" },
    { songName: "Ghar Se Nikalte Hi Kuch Dur Chalte Hi", songDuration: "07:24", filePath: "./songs/6.mp3", coverPath: "./images/6.jpg" },
    { songName: "O MERE DIL KE CHAIN", songDuration: "04:32", filePath: "./songs/7.mp3", coverPath: "./images/7.jpg" },
    { songName: "CHUKAR MERE MAN KO", songDuration: "04:15", filePath: "./songs/8.mp3", coverPath: "./images/8.jpg" },
    { songName: "TERE BINA ZINDAGI SE {AANDHI}", songDuration: "05:56", filePath: "./songs/9.mp3", coverPath: "./images/9.jpg" },
    { songName: "Awara - Dabangg 3", songDuration: "04:56", filePath: "./songs/10.mp3", coverPath: "./images/10.jpg" },
    { songName: "Kya Khoob Lagti Ho", songDuration: "03:59", filePath: "./songs/11.mp3", coverPath: "./images/11.jpg" },
    { songName: "Kitna Haseen Chehra", songDuration: "05:54", filePath: "./songs/12.mp3", coverPath: "./images/12.jpg" },
    { songName: "EK PYAR KA NAGHMA HAI", songDuration: "04:55", filePath: "./songs/13.mp3", coverPath: "./images/13.jpg" },
    { songName: "ZINDAGI PYAR KA GEET HAI {SOUTEN}", songDuration: "05:28", filePath: "./songs/14.mp3", coverPath: "./images/14.jpg" },
    { songName: "Hatho_Se_Choo_Lo_Tum", songDuration: "04:54", filePath: "./songs/15.mp3", coverPath: "./images/15.jpg" },
    { songName: "Tum-Agar-Saath-Dene-Ka-Vada-Karo", songDuration: "04:00", filePath: "./songs/16.mp3", coverPath: "./images/16.jpg" },
    { songName: "Love Me Thoda Aur", songDuration: "04:25", filePath: "./songs/17.mp3", coverPath: "./images/17.jpg" },
    { songName: "Sauda Hai Dil Ka", songDuration: "05:56", filePath: "./songs/18.mp3", coverPath: "./images/18.jpg" },
    { songName: "Jaoon Kahan Billu Barber", songDuration: "05:33", filePath: "./songs/19.mp3", coverPath: "./images/19.jpg" },
    { songName: "Chand Sitare Unplugged-Himanshu Sharma", songDuration: "02:32", filePath: "songs/20.mp3", coverPath: "./images/20.jpg" },
    { songName: "Har-Baat-Samjhana-Sambhav-Nahi-Radhe", songDuration: "03:18", filePath: "songs/21.mp3", coverPath: "./images/21.jpg" }
]

masterSongName.innerText = songs[0].songName;
songElements.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songDuration")[0].innerText = songs[i].songDuration;
})

playBtn.addEventListener("click", () => {
    if (audioSong.paused || audioSong.currentTime <= 0) {
        audioSong.play();
        playBtn.classList.remove("fa-play-circle");
        playBtn.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        // console.log("now play you");
        // if(audioSong.duration >= parseInt(songs[songIndex].songDuration)){
        //     audioSong.src = `songs/${songIndex+1}.mp3`;
        // }
    } else {
        audioSong.pause();
        playBtn.classList.remove("fa-pause-circle");
        playBtn.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        // console.log("now paused you");
    }
})

audioSong.addEventListener("timeupdate", () => {
    // Update Seekbar
    progress = parseInt((audioSong.currentTime / audioSong.duration) * 100);
    myProgressBar.value = progress;
    if (progress >= 100) {
        if (songIndex >= 20) {
            songIndex = 0
        } else {
            songIndex += 1;
        }
        audioSong.src = `songs/${songIndex+1}.mp3`;
        bigCover.src = `images/${songIndex+1}.jpg`;
        masterSongName.innerText = songs[songIndex].songName;
        bigCoverInfo.innerText = songs[songIndex].songName;
        audioSong.currentTime = 0;
        audioSong.play();
        gif.style.opacity = 1;
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
    }
})

myProgressBar.addEventListener("change", () => {
    audioSong.currentTime = myProgressBar.value * audioSong.duration / 100;
    const formateDuration = formatTime(audioSong.duration);
    const formateCurrTime = formatTime(audioSong.currentTime);
    // currTime.textContent = formateDuration;
    // fullSongTime.textContent = formateCurrTime;
    fullSongTime.innerText = songs[songIndex].songDuration;
    // console.log(parseInt(audioSong.currentTime));
    // console.log(parseInt(audioSong.duration));
})

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('perticularSongsPlay')).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName('perticularSongsPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        // console.log(e.target);
        makeAllPlays();
        if (audioSong.paused || audioSong.currentTime <= 0) {
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioSong.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioSong.currentTime = 0;
            audioSong.play();
            gif.style.opacity = 1;
            playBtn.classList.remove('fa-play-circle');
            playBtn.classList.add('fa-pause-circle');
        } else {
            audioSong.pause();
            playBtn.classList.remove("fa-pause-circle");
            playBtn.classList.add("fa-play-circle");
            gif.style.opacity = 0;
            // console.log("now paused you");
        }
    })
})

document.getElementById("next_btn").addEventListener('click', () => {
    if (songIndex >= 20) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    audioSong.src = `songs/${songIndex+1}.mp3`;
    bigCover.src = `images/${songIndex+1}.jpg`;
    masterSongName.innerText = songs[songIndex].songName;
    bigCoverInfo.innerText = songs[songIndex].songName;
    audioSong.currentTime = 0;
    audioSong.play();
    gif.style.opacity = 1;
    playBtn.classList.remove('fa-play-circle');
    playBtn.classList.add('fa-pause-circle');

})

document.getElementById("prev_btn").addEventListener('click', (e) => {
    console.log(e.target);
    if (songIndex <= 0) {
        songIndex = 20
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    audioSong.src = `songs/${songIndex+1}.mp3`;
    bigCover.src = `images/${songIndex+1}.jpg`;
    masterSongName.innerText = songs[songIndex].songName;
    bigCoverInfo.innerText = songs[songIndex].songName;
    audioSong.currentTime = 0;
    audioSong.play();
    gif.style.opacity = 1;
    playBtn.classList.remove('fa-play-circle');
    playBtn.classList.add('fa-pause-circle');
})

// Array.from(document.getElementsByClassName("dura_playbtn")).forEach((element) => {
//     element.addEventListener("ondblclick", (e) => {
//         console.log(e.target);
//     })
// })

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (audioSong.paused) {
            audioSong.play(); // Play the audio
            playBtn.classList.remove('fa-play-circle');
            playBtn.classList.add('fa-pause-circle');
        } else {
            audioSong.pause(); // Pause the audio
            playBtn.classList.remove("fa-pause-circle");
            playBtn.classList.add("fa-play-circle");
        }
    }
});