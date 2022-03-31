import { Tooltip } from '@chakra-ui/tooltip';
import { gsap, Linear, Power1 } from 'gsap';
import React, { useCallback, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { isMobile } from 'react-device-detect';
import { Link as RouterLink } from 'react-router-dom';
import BCubie1 from 'src/assets/images/bloc-cubie-1.png';
import BCubie2 from 'src/assets/images/bloc-cubie-2.png';
import BCubie3 from 'src/assets/images/bloc-cubie-3.png';
import BrCubie1 from 'src/assets/images/breed-cubie-1.png';
import BrCubie2 from 'src/assets/images/breed-cubie-2.png';
import GCubie1 from 'src/assets/images/game-cubie-1.png';
import GCubie2 from 'src/assets/images/game-cubie-2.png';
import Gamepad from 'src/assets/images/gamepad.png';
import Heart from 'src/assets/images/heart.png';
import Cubie1 from 'src/assets/images/ix/cubie-1.png';
import Cubie2 from 'src/assets/images/ix/cubie-2.png';
import Cubie3 from 'src/assets/images/ix/cubie-3.png';
import Cubie4 from 'src/assets/images/ix/cubie-4.png';
import Cubie5 from 'src/assets/images/ix/cubie-5.png';
import Shadow from 'src/assets/images/sh.png';
import TCubieLeft from 'src/assets/images/token-cubie-left.png';
import TCubieRight from 'src/assets/images/token-cubie-right.png';
import Token from 'src/assets/images/token.png';
import { useScrollbar } from 'src/hooks/useScrollbar';

const nn = Linear.easeNone;

export default function HomePage() {
  // Animations
  useEffect(() => {
    if (!isMobile) {
      gsap.defaults({ ease: nn });

      let t;

      document.querySelectorAll('.tk, .title').forEach((el) => {
        gsap.fromTo(
          el,
          0.8,
          { opacity: 0, top: 40 },
          {
            opacity: 1,
            top: 0,
            ease: Power1.easeOut,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });

      document.querySelectorAll('.title + .p').forEach((el) => {
        gsap.fromTo(
          el,
          1,
          { opacity: 0, top: 50 },
          {
            opacity: 1,
            top: 0,
            ease: Power1.easeOut,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });

      document.querySelectorAll('.bnc').forEach((el) => {
        gsap.fromTo(
          el,
          1,
          { opacity: 0, top: 60 },
          {
            opacity: 1,
            top: 0,
            ease: Power1.easeOut,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });

      // a

      document.querySelectorAll('#a .lst > div').forEach((el) => {
        gsap.fromTo(
          el,
          1,
          { opacity: 0, top: 60 },
          {
            opacity: 1,
            top: 0,
            ease: Power1.easeOut,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });

      // b

      gsap.fromTo(
        '#b .heart-1',
        1,
        { x: '10%', y: '5%', scale: 1, filter: 'blur(3px)', rotate: 15 },
        {
          rotate: -20,
          y: '-50%',
          x: '-50%',
          scale: 1.3,
          filter: 'blur(8px)',
          scrollTrigger: {
            trigger: '#b .heart-1',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '#b .heart-2',
        1,
        { x: '-20%', y: '5%', scale: 1, filter: 'blur(3px)', rotate: -15 },
        {
          rotate: 30,
          y: '10%',
          x: '20%',
          scale: 1.3,
          filter: 'blur(8px)',
          scrollTrigger: {
            trigger: '#b .heart',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      t = gsap.timeline({
        scrollTrigger: {
          trigger: '#b',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      t.fromTo('#b .heart', 1, { x: '-10%', filter: 'blur(3px)', scale: 0.8 }, { x: '10%', filter: 'blur(0px)', scale: 1 }, 'a');
      t.fromTo('#b .cub-1', 1, { x: '30%' }, { x: '-20%' }, 'a');
      t.fromTo('#b .cub-2', 1, { x: '-40%', filter: 'blur(10px)', scale: 0.5 }, { x: '30%', filter: 'blur(1px)', scale: 1 }, 'a');

      // c

      t = gsap.timeline({
        scrollTrigger: {
          trigger: '#c',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      t.fromTo('#c .gp', 1, { x: '10%' }, { x: '-10%' }, 'a');
      t.fromTo('#c .cub-1', 1, { x: '-30%' }, { x: '20%' }, 'a');
      t.fromTo('#c .cub-2', 1, { x: '40%', filter: 'blur(8px)', scale: 0.7 }, { x: '-30%', filter: 'blur(1px)', scale: 1 }, 'a');

      // d

      t = gsap.timeline({
        scrollTrigger: {
          trigger: '#d',
          start: 'top bottom',
          end: '40% top',
          scrub: true,
        },
      });
      t.fromTo('#d .cub-l, #d .cub-r', 1, { scale: 0.5 }, { scale: 1 }, 'a');
      t.fromTo('#d .cub-l', 1, { x: '-50%' }, { x: '10%' }, 'a');
      t.fromTo('#d .cub-r', 1, { x: '50%' }, { x: '-10%' }, 'a');

      // e

      document.querySelectorAll('#e ul > li').forEach((el) => {
        gsap.fromTo(
          el,
          1,
          { opacity: 0, top: 60 },
          {
            opacity: 1,
            top: 0,
            ease: Power1.easeOut,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });
    }

    const interval = setInterval(() => {
      let n;
      let a = document.querySelector('[data-cubie].active');
      if (a?.nextElementSibling) {
        n = a.nextElementSibling;
      } else {
        n = document.querySelector('[data-cubie="1"]');
      }
      a?.classList.remove('active');
      n?.classList.add('active');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  let { scrollToPos } = useScrollbar();
  const [discoverOffsetTop, setDiscoverOffsetTop] = useState(0);
  const scrollToDiscover = useCallback(() => {
    scrollToPos(discoverOffsetTop);
  }, [discoverOffsetTop]);

  // Discover
  useEffect(() => {
    const discoverOffsetTop = document.querySelector('#a').offsetTop - (!isMobile ? 150 : 115);
    setDiscoverOffsetTop(discoverOffsetTop);
  }, []);

  return (
    <>
      {/* Intro */}
      <div id="ix">
        <div className="ct">
          <div className="lft">
            <div className="title">
              <h1 className="h">
                Explore a set of <strong>cubic universes!</strong>
              </h1>
            </div>
            <div className="p">
              <p>
                <b>Cubie is a community-driven NFT & GameFi Platform.</b>
                <br />
                Start your journey in our metaverse by acquiring your first Cubie NFT, breeding it, and playing with him in one of our games.
              </p>
            </div>
            <div className="bnc">
              <button className="bn" onClick={scrollToDiscover}>
                Discover
              </button>
            </div>
          </div>
          <div className="rght">
            <div className="cub">
              <img src={Cubie1} data-cubie="1" className="active" alt="Cubie 3D NFT" />
              <img src={Cubie2} data-cubie="2" alt="Cubie 3D NFT" />
              <img src={Cubie3} data-cubie="3" alt="Cubie 3D NFT" />
              <img src={Cubie4} data-cubie="4" alt="Cubie 3D NFT" />
              <img src={Cubie5} data-cubie="5" alt="Cubie 3D NFT" />
            </div>
            <img src={Shadow} alt="Cubie 3D NFT" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="a">
        <div className="ct">
          <div className="title">
            <h2 className="h">
              <strong>Join Cubie</strong> A whole new interactive world
            </h2>
          </div>
          <div className="lst">
            <div>
              <div className="il">
                <img src={BCubie1} alt="Cubie 3D NFT" />
              </div>
              <h3>Collect</h3>
              <div className="p">
                <p>
                  Explore the extensive Cubies collection! Normal, Unique, Rare, Epic or Legendary, they're all adorable and have their own
                  characteristics.
                  <br />
                  Hurry, there won't be something for everyone.
                </p>
              </div>
              {/*
              <a href="" className="bn" title="Explore">
                Explore
              </a>
              */}
            </div>
            <div>
              <div className="il">
                <img src={BCubie2} alt="Cubie 3D NFT" />
              </div>
              <h3>Breed</h3>
              <div className="p">
                <p>
                  Evolve your Cubies team by making them breed with each other.
                  <br />
                  Be careful, they don't all get along perfectly but we're sure you will manage.
                  <br />
                  If you work miracles get rewarded by selling your creation on the marketplace!
                </p>
              </div>
            </div>
            <div>
              <div className="il">
                <img src={BCubie3} alt="Cubie 3D NFT" />
              </div>
              <h3>Play</h3>
              <div className="p">
                <p>
                  After effort, comes comfort.
                  <br />
                  Relax while playing with your Cubies at one of our games. The most talented among you will be directly rewarded with the platform's native token, $CUBE.
                  <br />
                  Who will be the star of the Cubie metaverse?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breeding */}
      <div id="b" className="sec">
        <img src={Heart} className="heart-1" alt="Cubie 3D NFT" />
        <div className="ct">
          <div className="txt">
            <div className="title">
              <h2 className="h">
                <strong>Breeding</strong> Make Love, Not War
              </h2>
            </div>
            <div className="p">
              <p>Spot the Cubies that get along well in your collection, and breed them. They will undoubtedly bring you prodigious children... or not?</p>
            </div>
            <div className="bnc">
              <Tooltip label="Coming soon..." fontSize="md" rounded="xl" px="4" py="2" bg="#ff969e">
                <RouterLink to="#" className="bn" title="Breed">
                  Breed
                </RouterLink>
              </Tooltip>
            </div>
          </div>
          <div className="illu">
            <img src={BrCubie2} className="cub-2" alt="Cubie 3D NFT" />
            <img src={Heart} className="heart" alt="Cubie 3D NFT" />
            <img src={BrCubie1} className="cub-1" alt="Cubie 3D NFT" />
          </div>
        </div>
        <img src={Heart} className="heart-2" alt="Cubie 3D NFT" />
      </div>

      {/* Games */}
      <div id="c" className="sec">
        <div className="ct">
          <div className="txt">
            <div className="title">
              <h2 className="h">
                <strong>Games</strong> Play to Earn
              </h2>
            </div>
            <div className="p">
              <p>
                Come, parade and face your best Cubies against other players in your favorite game. Challenge yourself to collect some precious $CUBE tokens!
              </p>
            </div>
            <div className="bnc">
              <Tooltip label="Coming soon..." fontSize="md" rounded="xl" px="4" py="2" bg="#7a6cf0">
                <RouterLink to="#" className="bn" title="Play">
                  Play
                </RouterLink>
              </Tooltip>
            </div>
          </div>
          <div className="illu">
            <img src={GCubie2} className="cub-2" alt="Cubie 3D NFT" />
            <img src={Gamepad} className="gp" alt="Cubie 3D NFT" />
            <img src={GCubie1} className="cub-1" alt="Cubie 3D NFT" />
          </div>
        </div>
      </div>

      {/* Token */}
      <div id="d">
        <div className="ct">
          <img className="tk" src={Token} alt="Cubies 3D NFT" />
          <div className="title">
            <h2 className="h">
              <strong>$CUBE</strong> Token
            </h2>
          </div>
          <div className="p">
            <p>
              The $CUBE token is the core of our platform, it is around it that the entire project is built.
              <br />
              All transactions, purchases, sales and bets are settled in CUBE. Access to games, marketplace, governance and staking will be exclusively reserved for CUBEs holders.
              <br />
            </p>
            <p style={{ marginTop: 10 }}>
              The vast majority of the platform's profits, 80%,<br/>
              will be used to buy and burn $CUBE on a weekly basis.
            </p>
          </div>

          <iframe id="jmSwapFrame" src="https://justmoney.exchange/widget" style={{width: 500, height: 500, margin: 'auto'}} allowtransparency="true" frameBorder="0" scrolling="no"></iframe>
        </div>
        <img src={TCubieLeft} className="cub cub-l" alt="Cubie 3D NFT" />
        <img src={TCubieRight} className="cub cub-r" alt="Cubie 3D NFT" />
      </div>
      
      { /**
          <iframe id="jmSwapFrame" src="https://justmoney.exchange/widget" style="width: 500px;height: 500px;margin:auto;" allowtransparency="true" frameborder="0" scrolling="no"></iframe>
          <script type="application/javascript">
              var JMSwapOptions = {
                  network: 'TRON',
                  liquidityTab: true,
                  shadow: false,
                  backgroundColor: '#ED4268',
                  textColor: '#FFF',
                  buttonStyle: 'background:#FFF;color:#000;',
                  maxButtonStyle: 'background:#FFF;color:#000;',
                  headingStyle: 'color:#FFF;',
                  lightBranding: true,
                  tokens: [],
                  excludeTokens: ['SafeMoney','ACTIV','MILK','ZLF','TWJ','ICR'],
                  fromToken: "TRX",
                  toToken: "JM",
                  tabNavStyle: "color: #ffffff;border-color:#FFF",
                  tabNavActiveStyle: 'background: white'
              }
          </script>
          <script src="https://justmoney.exchange/assets/js/widgetLib-1.0.js"></script>
       */}
       
      {/* Roadmap */}
      <div id="e">
        <div className="ct">
          <div className="title">
            <h2 className="h">
              <strong>Roadmap</strong> Who said cubies don't roll fast?
            </h2>
          </div>
          <ul>
            <li>
              <ol>
                <li>Q3 2021</li>
                <li className="done">Founded.</li>
                <li className="done">Minting started on Kraftly.io.</li>
                <li className="done">Sales of the first 70 Cubie NFTs.</li>
              </ol>
            </li>

            <li>
              <ol>
                <li>Q4 2021</li>
                <li className="done-alt">Product Website.</li>
                <li className="done-alt">Top Sellers on Kraftly.io.</li>
                <li className="done-alt">
                  Partnership with{' '}
                  <a href="https://justmoney.io" target="_blank" style={{ fontWeight: 'bold' }}>
                    JustMoney
                  </a>
                  .
                </li>
                <li className="done-alt">
                  Partnership with{' '}
                  <a href="https://www.locklet.finance" target="_blank" style={{ fontWeight: 'bold' }}>
                    Locklet
                  </a>
                  .
                </li>
                <li>$CUBE Token (TRC-20) Release & Sales.</li>
              </ol>
            </li>

            <li>
              <ol>
                <li>Q1 2022</li>
                <li>$CUBE NFT Contract (TRC-721) Release & Migrations.</li>
                <li>Platform Website.</li>
                <li>Cubie NFTs Breeding.</li>
              </ol>
            </li>

            <li>
              <ol>
                <li>Q2 2022</li>
                <li>Governance Launch.</li>
                <li>Mystery Box Integration.</li>
                <li>First Cubie Games.</li>
              </ol>
            </li>
          </ul>

          <div className="bnc" style={{ textAlign: 'center', marginTop: 50 }}>
            <RouterLink to="/cubies" className="bn" title="Play">
              See all Cubies
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  );
}
