import { useColorMode } from '@chakra-ui/color-mode';
import { usePrevious } from '@chakra-ui/hooks';
import { Expo, gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import WalletManager from 'src/components/Modals/WalletManager';
import NetworkManager from 'src/components/NetworkManager';
import BlockSync from 'src/components/Synchronizers/BlockSync';
import TransactionSync from 'src/components/Synchronizers/TransactionSync';
import Web3Manager from 'src/components/Web3Manager';
import { useScrollbar } from 'src/hooks/useScrollbar';
import { useActiveUnifiedWeb3 } from 'src/hooks/useUnifiedWeb3';
import CubiesPage from 'src/pages/Cubies/CubiesPage';
import GamesPage from 'src/pages/Games/GamesPage';
import HomePage from 'src/pages/Home/HomePage';

import 'src/styles/app.css';

const html = document.querySelector('html');
const body = document.querySelector('body');
const nn = Linear.easeNone;
const exo = Expo.easeOut;
const exi = Expo.easeInOut;

/* Utilities */

const fixClass = (y) => {
  y > 0 ? body.classList.add('fx') : body.classList.remove('fx');
  y > 50 ? body.classList.add('fxdo') : body.classList.remove('fxdo');
};

export default function App() {
  // const { chainId } = useActiveUnifiedWeb3();
  // const appNetwork = useSelector((state) => state.app.network);

  let { scrollbar, scrollToPos } = useScrollbar();

  const location = useLocation();
  const previousLocation = usePrevious(location);
  useEffect(() => {
    if (location?.pathname !== previousLocation?.pathname && scrollToPos) scrollToPos(0, 0);
  }, [location, scrollToPos]);

  // Smooth scrollbar
  useEffect(() => {
    if (isMobile) {
      html.classList.add('mob');
      window.addEventListener('scroll', () => fixClass(window.scrollY));

      // up
      const dataUp = document.querySelector('[data-up]');
      dataUp?.addEventListener('click', () => scrollToPos(0));
    } else {
      document.querySelector('#smooth-scrollbar-style')?.remove();

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.scrollerProxy('body', {
        scrollTop(value) {
          arguments.length ? (scrollbar.scrollTop = value) : !1;
          return scrollbar.scrollTop;
        },
      });

      scrollbar.addListener(ScrollTrigger.update);
      scrollbar.addListener((status) => {
        let y = status.offset.y;
        let x = status.offset.x;

        const hn = document.querySelector('#h, #n');
        if (hn) hn.style.top = y + 'px';

        const df = document.querySelectorAll('[data-fixed]');
        df.forEach((el) => {
          el.style.marginTop = y + 'px';
        });

        const sc = document.querySelectorAll('.scroll-content');
        sc.forEach((el) => {
          el.style.left = x + 'px';
        });

        fixClass(y);

        html.classList.contains('stop') ? scrollbar.setPosition(0, sessionStorage.getItem('y')) : sessionStorage.setItem('y', y);
        // localStorage.setItem('y', y);
      });

      // scrollbar.setPosition(0, localStorage.getItem('y'));

      gsap.defaults({ ease: nn });
      gsap.config({ nullTargetWarn: false });

      // scrollbar grabbing
      document.querySelector('.scrollbar-track-y').addEventListener('mousedown', () => body.classList.add('grab'));
      document.querySelector('*').addEventListener('mouseup', () => {
        body.classList.contains('grab') ? body.classList.remove('grab') : !1;
      });

      // direction scroll
      const checkDirection = (e) => {
        checkScrollDirectionIsUp(e) ? body.classList.remove('down') : body.classList.add('down');
      };

      document.body.addEventListener('wheel', checkDirection, { passive: true });
      const checkScrollDirectionIsUp = (e) => {
        if (e.wheelDelta) {
          return e.wheelDelta > 0;
        }
        return e.deltaY < 0;
      };

      // up
      const dataUp = document.querySelector('[data-up]');
      dataUp?.addEventListener('click', () => scrollToPos(0));
    }
  }, []);

  return (
    <>
      <Toaster
        position={'bottom-center'}
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          loading: { duration: 1500000 },
          success: { duration: 5000 },
          error: { duration: 8000 },
        }}
      />

      <div>
        <Header />

        {/* Network */}
        <NetworkManager />

        <Web3Manager>
          {/* Sync */}
          <BlockSync />
          <TransactionSync />

          {/* Routes */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cubies" component={CubiesPage} />
            <Route exact path="/games" component={GamesPage} />

            <Redirect to="/" />
          </Switch>
        </Web3Manager>

        <Footer />

        {/* Modals */}
        <WalletManager />
      </div>
    </>
  );
}
