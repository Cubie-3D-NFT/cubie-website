import { TrxChainId } from 'src/constants';

import { TronLinkConnector } from './TronLinkConnector';
import { TronNetworkConnector } from './TronNetworkConnector';

const TRX_NETWORK_URL = process.env.REACT_APP_TRX_NETWORK_URL;

export const TRX_NETWORK_CHAIN_ID = process.env.REACT_APP_TRX_CHAIN_ID ?? TrxChainId.MAINNET;

if (typeof TRX_NETWORK_URL === 'undefined') {
  throw new Error(`TRX_NETWORK_URL must be a defined environment variable`);
}

export const tronNetwork = () => new TronNetworkConnector({ urls: { [TRX_NETWORK_CHAIN_ID]: TRX_NETWORK_URL } });

export const tronLink = new TronLinkConnector();
