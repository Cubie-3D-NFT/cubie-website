import { Text } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import { Back, gsap } from 'gsap';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from 'src/assets/images/logo.svg';
import usePrevious from 'src/hooks/usePrevious';

const html = document.querySelector('html');

export default function Header() {
  const [nav, setNav] = useState(null);

  // Navigation
  useEffect(() => {
    const nvc = gsap.timeline({ paused: true });
    nvc.fromTo('#n, #n a', { pointerEvents: 'auto' }, { pointerEvents: 'none' }, 'a');
    nvc.fromTo('#n li', 0.5, { top: 0, opacity: 1 }, { top: 0, opacity: 0 }, 'a');

    const nvo = gsap.timeline({ paused: true });
    nvo.fromTo('#n, #n a', { pointerEvents: 'none' }, { pointerEvents: 'auto' }, 'a');
    nvo.staggerFromTo('#n li', 1, { top: '30vh', opacity: 0 }, { top: 0, opacity: 1, ease: Back.easeOut }, 0.2, 'a');

    const nav = {
      close() {
        html.classList.remove('onav');
        html.classList.remove('stop');
        nvc.restart();
      },
      open() {
        html.classList.add('onav');
        html.classList.add('stop');
        nvo.restart();
      },
      toggle() {
        if (html.classList.contains('onav')) this.close();
        else this.open();
      },
      init() {
        const dataNav = document.querySelector('[data-nav]');
        dataNav?.addEventListener('click', () => this.toggle());
      },
    };

    nav.init();

    setNav(nav);
  }, []);

  const location = useLocation();
  const previousLocation = usePrevious(location);
  useEffect(() => {
    if (location?.pathname !== previousLocation?.pathname && nav) nav.close();
  }, [location, nav]);

  const { pathname } = location;

  return (
    <header id="h">
      <div className="l">
        <RouterLink to="/" className="lg">
          <img src={Logo} width="1580" height="410" alt="Cubie 3D NFT" />
        </RouterLink>
      </div>
      <nav id="n">
        <ul>
          <li>
            <RouterLink to="/" title="Home" className={pathname == '/' ? 'act' : undefined}>
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/cubies" title="Cubies" className={pathname == '/cubies' ? 'act' : undefined}>
              Cubies
            </RouterLink>
          </li>
          <li>
            <Tooltip label="Coming soon..." fontSize="md" rounded="md" px="4" py="2" bg="black">
              <RouterLink to="#" title="Breed">
                Breed
              </RouterLink>
            </Tooltip>
          </li>
          <li>
            <RouterLink to="/games" title="Games" className={pathname == '/games' ? 'act' : undefined}>
              Games
            </RouterLink>
          </li>
          <li>
            <Tooltip label="Coming soon..." fontSize="md" rounded="md" px="4" py="2" bg="white" color="black">
              <RouterLink to="#" title="Connect" className="hl">
                Connect
              </RouterLink>
            </Tooltip>
          </li>
        </ul>
      </nav>
      <div className="bnv" data-nav>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path className="l-1" d="M0,42h62c13,0,6,26-4,16L35,35"></path>
          <path className="l-2" d="M0,50h70"></path>
          <path className="l-3" d="M0,58h62c13,0,6-26-4-16L35,65"></path>
        </svg>
      </div>
    </header>
  );
}
