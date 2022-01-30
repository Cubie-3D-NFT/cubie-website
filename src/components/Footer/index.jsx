import { Link as RouterLink } from 'react-router-dom';
import LockletCubie from 'src/assets/images/cubie-locket.png';
import LogoWhite from 'src/assets/images/logo-white.svg';

import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer id="f">
      <div className="ct">
        <div className="top">
          <div className="l">
            <img src={LogoWhite} alt="Cubie 3D NFT" />
          </div>
          <Newsletter />
        </div>
        <div className="bottom">
          <div className="l">
            <ul>
              <li>
                <a href="https://t.me/CubieNFT" target="_blank" rel="noopener noreferrer" title="Telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 24 24" width="512">
                    <path d="M12 24a12 12 0 1 0 0-24 12 12 0 1 0 0 24zM5.491 11.74l11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Cubie3DNFT" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" height="682.667" viewBox="0 0 512 512" width="682.667">
                    <path d="M256 0C114.637 0 0 114.637 0 256s114.637 256 256 256 256-114.637 256-256S397.363 0 256 0zm116.887 199.602c.113 2.52.168 5.051.168 7.594 0 77.645-59.102 167.18-167.184 167.184h.004-.004c-33.184 0-64.062-9.727-90.066-26.395a119.51 119.51 0 0 0 14.016.813c27.531 0 52.867-9.391 72.98-25.152-25.723-.477-47.41-17.465-54.895-40.812a58.48 58.48 0 0 0 11.043 1.063c5.363 0 10.559-.723 15.496-2.07-26.887-5.383-47.141-29.145-47.141-57.598l.008-.75c7.918 4.402 16.973 7.051 26.613 7.348-15.777-10.527-26.148-28.523-26.148-48.91 0-10.766 2.91-20.852 7.957-29.535 28.977 35.555 72.281 58.938 121.117 61.395-1.008-4.305-1.527-8.789-1.527-13.398 0-32.437 26.316-58.754 58.766-58.754 16.902 0 32.168 7.145 42.891 18.566 13.387-2.641 25.957-7.531 37.313-14.262-4.395 13.715-13.707 25.223-25.84 32.5 11.887-1.422 23.215-4.574 33.742-9.254-7.863 11.785-17.836 22.137-29.309 30.43zm0 0" />
                  </svg>
                </a>
              </li>
              {/*
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Medium">
                  <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 176 176" width="512">
                    <path d="M88 0a88 88 0 1 0 88 88A88 88 0 0 0 88 0zm55 46.3l-8.78 8.39a2.55 2.55 0 0 0-1 2.45v61.73a2.54 2.54 0 0 0 1 2.44l8.57 8.4v1.83H99.66v-1.84l8.89-8.6c.86-.86.86-1.13.86-2.45V68.78l-24.71 62.6h-3.35l-28.74-62.6v42a5.72 5.72 0 0 0 1.59 4.81l11.55 14v1.84H33v-1.81l11.55-14a5.52 5.52 0 0 0 1.45-4.88V62.23a4.31 4.31 0 0 0-1.39-3.59L34.39 46.3v-1.84h31.88L90.92 98.4l21.67-53.94H143z"></path>
                  </svg>
                </a>
              </li>
              */}
              <li>
                <a href="https://www.instagram.com/cubienft" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" height="682.667" viewBox="0 0 512 512" width="682.667">
                    <path d="M305 256c0 27.063-21.937 49-49 49s-49-21.937-49-49 21.938-49 49-49 49 21.938 49 49zm65.594-86.695c-2.355-6.383-6.113-12.16-10.996-16.902a45.51 45.51 0 0 0-16.902-10.996c-5.18-2.012-12.961-4.406-27.293-5.059-15.504-.707-20.152-.859-59.402-.859s-43.902.148-59.402.855c-14.332.656-22.117 3.051-27.293 5.063a45.47 45.47 0 0 0-16.902 10.996 45.57 45.57 0 0 0-11 16.902c-2.012 5.18-4.406 12.965-5.059 27.297-.707 15.5-.859 20.148-.859 59.402l.859 59.402c.652 14.332 3.047 22.113 5.059 27.293a45.55 45.55 0 0 0 10.996 16.902 45.51 45.51 0 0 0 16.902 10.996c5.18 2.016 12.965 4.41 27.297 5.063 15.5.707 20.145.855 59.398.855l59.402-.855c14.332-.652 22.117-3.047 27.297-5.062a48.68 48.68 0 0 0 27.898-27.898c2.012-5.18 4.406-12.961 5.063-27.293.707-15.504.855-20.152.855-59.402l-.855-59.402c-.652-14.332-3.047-22.117-5.062-27.297zM256 331.484c-41.691 0-75.488-33.793-75.488-75.484s33.797-75.484 75.488-75.484 75.484 33.793 75.484 75.484-33.797 75.484-75.484 75.484zm78.469-136.312c-9.742 0-17.641-7.898-17.641-17.641s7.898-17.641 17.641-17.641 17.641 7.898 17.641 17.641-7.898 17.641-17.641 17.641zM256 0C114.637 0 0 114.637 0 256s114.637 256 256 256 256-114.637 256-256S397.363 0 256 0zm146.113 316.605c-.711 15.648-3.199 26.332-6.832 35.684-7.637 19.746-23.246 35.355-42.992 42.992-9.348 3.633-20.035 6.117-35.68 6.832-15.676.715-20.684.887-60.605.887s-44.93-.172-60.609-.887c-15.645-.715-26.332-3.199-35.68-6.832a72.02 72.02 0 0 1-26.039-16.957 72.04 72.04 0 0 1-16.953-26.035c-3.633-9.348-6.121-20.035-6.832-35.68-.723-15.68-.891-20.687-.891-60.609l.887-60.605c.711-15.648 3.195-26.332 6.828-35.684a72 72 0 0 1 16.961-26.035 72.01 72.01 0 0 1 26.035-16.957c9.352-3.633 20.035-6.117 35.684-6.832C211.07 109.172 216.078 109 256 109s44.93.172 60.605.891c15.648.711 26.332 3.195 35.684 6.824a72.06 72.06 0 0 1 26.039 16.961 72.02 72.02 0 0 1 16.953 26.035c3.637 9.352 6.121 20.035 6.836 35.684.715 15.676.883 20.684.883 60.605l-.887 60.605zm0 0"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.locklet.finance" target="_blank" rel="noopener noreferrer" title="Locklet">
                  <img src={LockletCubie} alt="Locket Cubie" />
                </a>
              </li>
            </ul>
            <p>Cubie © 2021. All rights reserved.</p>
          </div>
          <div className="r">
            <ul>
              <li>
                <ol>
                  <li>Explore</li>
                  <li>
                    <RouterLink to="/" title="Home">
                      Home
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/cubies" title="Cubies">
                      Cubies
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#" title="Breed">
                      Breed
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/games" title="Games">
                      Games
                    </RouterLink>
                  </li>
                </ol>
              </li>
              <li>
                <ol>
                  <li>Resources</li>
                  <li>
                    <a href="#" title="Documentation" target="_blank">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Cubie-3D-NFT" title="Github" target="_blank">
                      Github
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Press Kit">
                      Press Kit
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <ol>
                  <li>Social</li>
                  <li>
                    <a href="https://t.me/CubieNFT" title="Telegram" target="_blank">
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Cubie3DNFT" title="Twitter" target="_blank">
                      Twitter
                    </a>
                  </li>
                  {/*
                  <li>
                    <a href="#" title="Medium" target="_blank">
                      Medium
                    </a>
                  </li>
                  */}
                  <li>
                    <a href="https://www.instagram.com/cubienft" title="Instagram" target="_blank">
                      Instagram
                    </a>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
