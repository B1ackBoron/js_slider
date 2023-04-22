(function () {

  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorContainer = container.querySelector('#indicators-container');
  const indicatorItems = container.querySelectorAll('.indicator');
  const pauseBtn = container.querySelector('#pause-btn');
  const prevBtn = container.querySelector('#prev-btn');
  const nextBtn = container.querySelector('#next-btn');

  const SLIDES_LENGTH = slides.length;
  const CODE_ARROW_LEFT = 'ArrowLeft';
  const CODE_ARROW_RIGHT = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  const FA_PLAY = '<i class="fas fa-play-circle"></i>';

  let currentSlide = 0;
  let timerID = null;
  let isPlaying = true;
  let interval = 2000;
  let startPosX = null;
  let endPosX = null;

  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    slides[currentSlide].classList.toggle('active');
    indicatorItems[currentSlide].classList.toggle('active');
  }

  function gotoNext() {
    gotoNth(currentSlide + 1);
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }

  function tick() {
    timerID = setInterval(gotoNext, interval);
  }

  function pauseHandler() {
    if (isPlaying) {
      clearInterval(timerID);
      pauseBtn.innerHTML = FA_PLAY;
      isPlaying = false;
    }
  }

  function playHandler() {
    tick();
    pauseBtn.innerHTML = FA_PAUSE;
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

  function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      pauseHandler();
      gotoNth(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === CODE_ARROW_LEFT) prevHandler();
    if (e.code === CODE_ARROW_RIGHT) nextHandler();
    if (e.code === CODE_SPACE) pausePlayHandler();
  }

  function swipeStart(e) {
    startPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    endPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;
    if (endPosX - startPosX > 100) prevHandler();
    if (endPosX - startPosX < -100) nextHandler();
  }

  function initListeners() {
    pauseBtn.addEventListener('click', pausePlayHandler);
    prevBtn.addEventListener('click', prevHandler);
    nextBtn.addEventListener('click', nextHandler);
    indicatorContainer.addEventListener('click', indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('mousedown', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    container.addEventListener('mouseup', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }

  function initApp() {
    tick();
    initListeners();
  }

  initApp();

}());
