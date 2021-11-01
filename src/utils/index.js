import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { JSBI, Percent } from '@uniswap/sdk';
import { TrxChainId } from 'src/constants';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES = {
  [EthChainId.MAINNET]: '',
  [EthChainId.ROPSTEN]: 'ropsten.',
  [EthChainId.RINKEBY]: 'rinkeby.',
  [EthChainId.GÖRLI]: 'goerli.',
  [EthChainId.KOVAN]: 'kovan.',
};

const BSCSCAN_PREFIXES = {
  [BscChainId.MAINNET]: '',
  [BscChainId.TESTNET]: 'testnet.',
};

const TRONSCAN_PREFIXES = {
  [TrxChainId.MAINNET]: '',
  [TrxChainId.SHASTA]: 'shasta.'
}

export function getExplorerLink(chainId, data, type) {
  let prefix = null;

  const ethNetworks = [EthChainId.MAINNET, EthChainId.ROPSTEN];
  const bscNetworks = [BscChainId.MAINNET, BscChainId.TESTNET];
  const trxNetworks = [TrxChainId.MAINNET, TrxChainId.SHASTA];

  const isEthNetwork = ethNetworks.includes(chainId);
  const isBscNetwork = bscNetworks.includes(chainId);
  const isTrxNetwork = trxNetworks.includes(chainId);

  if (isEthNetwork || isBscNetwork) {
    if (isEthNetwork) {
      prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[EthChainId.MAINNET]}etherscan.io`;
    } else if (isBscNetwork) {
      prefix = `https://${BSCSCAN_PREFIXES[chainId] || BSCSCAN_PREFIXES[BscChainId.MAINNET]}bscscan.com`;
    }

    switch (type) {
      case 'transaction': {
        return `${prefix}/tx/${data}`;
      }
      case 'token': {
        return `${prefix}/token/${data}`;
      }
      case 'block': {
        return `${prefix}/block/${data}`;
      }
      case 'address':
      default: {
        return `${prefix}/address/${data}`;
      }
    }
  } else if (isTrxNetwork) {
    prefix = `https://${TRONSCAN_PREFIXES[chainId] || TRONSCAN_PREFIXES[TrxChainId.MAINNET]}tronscan.org`;

    switch (type) {
      case 'transaction': {
        return `${prefix}/#/transaction/${data}`;
      }
      case 'token': {
        return `${prefix}/#/token20/${data}`;
      }
      case 'block': {
        return `${prefix}/#/block/${data}`;
      }
      case 'address':
      default: {
        return `${prefix}/#/address/${data}`;
      }
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  if (address.startsWith('0x')) {
    const parsed = isAddress(address);
    if (!parsed) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
  }
  else if (address.startsWith('T')) {
    return `${address.substring(0, chars + 2)}...${address.substring(34 - chars)}`;
  }
}

export function shortenTxHash(hash, chars = 4) {
  return `${hash.substring(0, chars + 2)}...${hash.substring(66 - chars)}`;
}

// add 10%
export function calculateGasMargin(value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num) {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

export function calculateSlippageAmount(value, slippage) {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`);
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
  ];
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function daysBetween(a, b) {
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}

export function formatDate(date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatTime(date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatUsd(usd) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    currency: 'USD',
  }).format(usd);
}

export function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  return +r + "," + +g + "," + +b;
}