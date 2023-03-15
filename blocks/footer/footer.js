import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const MQ = window.matchMedia('(min-width: 900px)');
/**
 * Toggles the links accordion
 * @param {Element} section The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllDrops(section, expanded = false) {
  section.querySelectorAll('ul > .links-drop').forEach((drop) => {
    drop.setAttribute('aria-expanded', expanded);
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});
  const html = await resp.text();

  const footer = document.createElement('div');
  footer.innerHTML = html;

  const classes = ['store-links', 'copyright'];
  classes.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`footer-${c}`);
  });

  const dropdowns = footer.querySelectorAll('.footer-store-links');
  if (dropdowns) {
    dropdowns.forEach((dropdown) => {
      dropdown.querySelectorAll(':scope > ul > li').forEach((drop) => {
        if (drop.querySelector('ul')) {
          drop.classList.add('links-drop');
          drop.addEventListener('click', () => {
            if (!MQ.matches && dropdown.className.includes('store-links')) {
              const expanded = drop.getAttribute('aria-expanded') === 'true';
              toggleAllDrops(dropdown);
              drop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            }
          });
        }
      });
    });
  }

  // rewrap sections

  const storeLinks = footer.querySelector('.footer-store-links');
  if (storeLinks) {
    const wrapper = document.createElement('div');
    wrapper.className = 'links-drop-wrapper';
    wrapper.append(storeLinks);
    block.append(wrapper);
  }

  block.append(footer);
  decorateIcons(block);
}
