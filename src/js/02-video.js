import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("#vimeo-player");
const player = new Player(iframe);


player.on('timeupdate',  throttle( e => {
    localStorage.setItem('videoplayer-current-time', e.seconds);
    }, 1000));

// Отримати збережений час відтворення з локального сховища
const currentTime = localStorage.getItem('videoplayer-current-time');

// Встановити збережений час відтворення
if (currentTime) {
  player.setCurrentTime(currentTime);
}

