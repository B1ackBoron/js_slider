const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let currentSlide = 0;
let timerID = null;
let isPlaying = true;

const interval = 2000;

function gotoNth(n) {
  slides[currentSlide].className = 'slide';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].className = 'slide active';
}

function gotoNext() {
  gotoNth(currentSlide + 1);
}

function gotoPrev() {
  gotoNth(currentSlide - 1);
}

function pauseHandler() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseBtn.innerHTML = 'Play';
    isPlaying = false;
  }
}

function playHandler() {
  timerID = setInterval(gotoNext, interval);
  pauseBtn.innerHTML = 'Pause';
  isPlaying = true;
}

function pausePlayHandler() {
  if (isPlaying) {
    pauseHandler();
  } else {
    playHandler();
  }
}

function nextHandler() {
  gotoNext();
  pauseHandler();
}

function prevHandler() {
  gotoPrev();
  pauseHandler();
}

timerID = setInterval(gotoNext, interval);

pauseBtn.addEventListener('click', pausePlayHandler);
prevBtn.addEventListener('click', prevHandler);
nextBtn.addEventListener('click', nextHandler);
