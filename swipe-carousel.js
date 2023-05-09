import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.slideItems[0].parentElement;
  }

  _initListeners() {
    super._initListeners();
    this.slidesContainer.addEventListener('touchstart', this.swipeStart.bind(this));
    this.slidesContainer.addEventListener('mousedown', this.swipeStart.bind(this));
    this.slidesContainer.addEventListener('touchend', this.swipeEnd.bind(this));
    this.slidesContainer.addEventListener('mouseup', this.swipeEnd.bind(this));
  }

  swipeStart(e) {
    this.startPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;
  }

  swipeEnd(e) {
    this.endPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  }
}

export default SwipeCarousel;
