import { ChakraProvider } from '@chakra-ui/react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { NetworkContextName } from './constants';
import { createTronWebRoot, TronWebProvider } from './hooks/useTronWeb';
import App from './layout/App';
import { theme } from './layout/Theme';
import { store } from './store';
import { getLibrary, getTronLibrary } from './utils/getLibrary';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
const TronWebProviderNetwork = createTronWebRoot(NetworkContextName);

if ('ethereum' in window) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>

          {/* Web3 Provider */}
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>

              {/* Tron Provider */}
              <TronWebProvider getLibrary={getTronLibrary}>
                <TronWebProviderNetwork getLibrary={getTronLibrary}>

                  <App />

                </TronWebProviderNetwork>
              </TronWebProvider>
              
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
})();

Modal.setAppElement('#app');
