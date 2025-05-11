// Create the audio element
let audio = new Audio('assets/music.mp3'); // Path to your audio file
audio.loop = true; // Loop the music
audio.muted = true; // Initially muted to allow autoplay

// Try to play the audio when the page loads
window.addEventListener('DOMContentLoaded', function() {
  // Attempt to play the audio with mute enabled
  audio.play().then(() => {
    audio.muted = false; // Unmute after it starts playing
  }).catch((error) => {
    console.log('Audio playback failed:', error);
  });
});

// Stopwatch functionality
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let display = document.getElementById("display");
let lapsContainer = document.getElementById("laps");
let timer = null;
let lapCount = 1;

// Stopwatch function that updates every 10 milliseconds
function stopwatch() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0");

  display.innerText = `${h}:${m}:${s}.${ms}`;
}

// Start the stopwatch
function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 10);
}

// Pause the stopwatch
function pause() {
  clearInterval(timer);
  timer = null;
}

// Reset the stopwatch
function reset() {
  clearInterval(timer);
  timer = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  display.innerText = "00:00:00.000";
  lapsContainer.innerHTML = "";
  lapCount = 1;
}

// Record a lap
function lap() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0");

  let lapTime = `${h}:${m}:${s}.${ms}`;
  let li = document.createElement("li");
  li.textContent = `Lap ${lapCount++}: ${lapTime}`;
  lapsContainer.appendChild(li);
}

// Toggle the music on/off
function toggleAudio() {
  if (audio.paused) {
    audio.play().then(() => {
      audio.muted = false; // Unmute when playing
    }).catch((error) => {
      console.log('Audio playback failed:', error);
    });
  } else {
    audio.pause(); // Pause the music
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  document.body.classList.toggle("dark");
}
