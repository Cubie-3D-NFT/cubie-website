import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';

import { NetworkConnector } from './NetworkConnector';

const ETH_NETWORK_URL = process.env.REACT_APP_ETH_NETWORK_URL;
const BSC_NETWORK_URL = process.env.REACT_APP_BSC_NETWORK_URL;

export const ETH_NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_ETH_CHAIN_ID ?? EthChainId.MAINNET);
export const BSC_NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID ?? BscChainId.MAINNET);

/*
if (typeof ETH_NETWORK_URL === 'undefined') {
  throw new Error(`ETH_NETWORK_URL must be a defined environment variable`);
}

if (typeof BSC_NETWORK_URL === 'undefined') {
  throw new Error(`BSC_NETWORK_URL must be a defined environment variable`);
}
*/

export const web3ReactNetwork = (network) => {
  switch (network) {
    case 'eth':
      return new NetworkConnector({ urls: { [ETH_NETWORK_CHAIN_ID]: ETH_NETWORK_URL } });

    case 'bsc':
      return new NetworkConnector({ urls: { [BSC_NETWORK_CHAIN_ID]: BSC_NETWORK_URL } });
  }
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 56, 97],
});

