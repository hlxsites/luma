/* eslint-disable max-classes-per-file */
const animationTime = 500; // animation time of .promo-banner > div.animated in css

// Scroll between banner pages by dragging
function makeScrollableWithDrag(item, end) {
  let startPosition;
  item.style.cursor = 'grab';
  item.style['user-select'] = 'none';

  function mouseMove(e) {
    const offset = e.pageX - startPosition;
    item.style.transform = `translateX(${offset}px)`;
  }

  function mouseUp(e) {
    const offset = e.pageX - startPosition;
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('touchmove', mouseMove);
    document.removeEventListener('touchend', mouseUp);
    end(offset);
  }

  function mouseDown(e) {
    item.classList.remove('animated');

    startPosition = e.pageX;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('touchmove', mouseMove, { passive: true });
    document.addEventListener('touchend', mouseUp, { passive: true });
  }

  function reAttachListener() {
    item.addEventListener('mousedown', mouseDown);
    item.addEventListener('touchstart', mouseDown, { passive: true });
  }

  function removeListener() {
    item.removeEventListener('mousedown', mouseDown);
    item.removeEventListener('touchstart', mouseDown);
  }

  reAttachListener();

  return [removeListener, reAttachListener];
}

export class Carousel {
  constructor(items) {
    this.items = items;
    this.currentItemIndex = 0;
    this.totalItems = items.length;
    this.parent = items[0]?.parentElement;
    this.itemDragListeners = []; // Event listeners for dragging between pages
  }

  // eslint-disable-next-line class-methods-use-this
  playAnimation(currentItem, nextItem, reverse) {
    nextItem.classList.add('animated');
    currentItem.classList.add('animated');
    nextItem.style.transform = 'translateX(0)';
    currentItem.style.transform = reverse ? 'translateX(100%)' : 'translateX(-100%)';
  }

  changeShowingItem(nextItemIndex, reverse = false) {
    this.items.forEach((elem) => elem.classList.remove('animated'));

    const nextItem = this.items[nextItemIndex];
    const currentItem = this.items[this.currentItemIndex];

    // Prevent dragging during animation
    const [removeCurrentDrag, attachCurrentDrag] = this.itemDragListeners[this.currentItemIndex];
    const [removeNextDrag, attachNextDrag] = this.itemDragListeners[nextItemIndex];

    removeCurrentDrag();
    removeNextDrag();

    nextItem.style.transform = reverse ? 'translateX(-100%)' : 'translateX(100%)';

    // Add delay to allow for CSS style to be applied
    setTimeout(() => this.playAnimation(currentItem, nextItem, reverse), 20);

    setTimeout(() => {
      attachCurrentDrag();
      attachNextDrag();
    }, animationTime);

    this.currentItemIndex = nextItemIndex;
  }

  showPrevious() {
    const nextItemIndex = (this.currentItemIndex + this.totalItems - 1) % this.totalItems;

    this.changeShowingItem(nextItemIndex, true);
  }

  showNext() {
    const nextItemIndex = (this.currentItemIndex + this.totalItems + 1) % this.totalItems;

    this.changeShowingItem(nextItemIndex, false);
  }

  init() {
    this.parent.setAttribute('tabindex', '0');
    this.parent.addEventListener('focus', () => {
      this.stop();
    });
    this.parent.addEventListener('blur', () => {
      this.start();
    });
    this.parent.addEventListener('keydown', (e) => {
      if (e.keyCode === 39 /* Arrow Right */) {
        this.showNext();
      }
      if (e.keyCode === 37 /* Arrow Left */) {
        this.showPrevious();
      }
    });
    this.items.forEach((item) => {
      this.itemDragListeners.push(makeScrollableWithDrag(item, (offset) => {
        if (offset < -20) {
          this.showNext();
        } else if (offset > 20) {
          this.showPrevious();
        }
      }));
    });
    this.start();
  }

  start() {
    this.interval = setInterval(() => this.showNext(), 3000);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default async function decorate(block) {
  const carousel = new Carousel(Array.from(block.children));
  carousel.init();
}
