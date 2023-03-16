/*
* Parallax Block
*/

function parallax(block, multiplier = 0.4) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    /* The number of pixels subtracted here should match the negative
     * number of pixels in the CSS line 13 to avoid a jump upon scrolling */
    block.style.backgroundPositionY = `${offset * multiplier - 150}px`;
  });
}

/**
* decorates the parallax block
* @param {Element} block The block
*/
export default async function decorate(block) {
  const columns = [...block.children];
  const images = columns[1].querySelectorAll(':scope > div');
  const [desktopImage] = images[0].querySelector('img').src.split('?');
  let multiplier = 0.4;
  // TODO: finish mobile image or delete
  let mobileImage;
  if (images.length > 1) {
    [mobileImage] = images[1].querySelector('img').src.split('?');
  }

  const parallaxBlock = document.createElement('div');
  parallaxBlock.classList.add('parallax-background');
  parallaxBlock.append(columns[0].querySelector(':scope > div'));

  parallaxBlock.style.backgroundImage = `url(${desktopImage})`;
  if (window.innerWidth < 900) {
    parallaxBlock.style.backgroundImage = `url(${mobileImage})`;
    multiplier = 0.2;
  }

  block.textContent = '';
  block.append(parallaxBlock);
  parallax(parallaxBlock, multiplier);
}
