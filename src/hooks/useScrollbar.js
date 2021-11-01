import { isMobile } from 'react-device-detect';
import Scrollbar from 'smooth-scrollbar';
import EdgeEasingPlugin from 'src/utils/edgeEasingPlugin';

const body = document.querySelector('body');

let scrollbar = null;
let scrollToPos = null;

if (isMobile) {
  scrollToPos = (pos) => {
    window.scrollTo(0, pos);
  };
} else {
  Scrollbar.use(EdgeEasingPlugin);

  scrollbar = Scrollbar.init(body, {
    damping: navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 0.1 : 0.08,
    alwaysShowTracks: false,
    delegateTo: document,
    direction: true,
  });

  scrollToPos = (pos) => {
    scrollbar.scrollTo(0, pos, 1000);
  };
}

export function useScrollbar() {
  return { scrollbar, scrollToPos };
}
