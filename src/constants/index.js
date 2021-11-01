import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { injected, tronLink } from 'src/connectors';

/* TRON */

export const TrxChainId = {
  MAINNET: "00000000000000001ebf88508a03865c71d452e25f4d51194196a1d22b6653dc",
  SHASTA: "0000000000000000de1aa88295e1fcf982742f773e0419c5a9c134c994a9059e",
  NILE: "0000000000000000d698d4192c56cb6be724a558448e2684802de4d6cd8690dc"
}

export const __DEV__ = process.env.NODE_ENV === 'development';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13;

export const CUBE_TOKEN = {
  [EthChainId.MAINNET]: '',
  [EthChainId.ROPSTEN]: '',

  [BscChainId.MAINNET]: '',
  [BscChainId.TESTNET]: '',

  [TrxChainId.MAINNET]: '',
  [TrxChainId.NILE]: ''
};

export const SUPPORTED_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  TRON_LINK: {
    connector: tronLink,
    name: 'TronLink',
    iconName: 'tronLinkIcon.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  /*
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
  */
};

export const CONNECTORS_TYPES = { RLP: 'RLP', TRX: 'TRX' };
export const PROVIDERS = { TRON: 'TRON' };

export const NetworkContextName = 'NETWORK';
