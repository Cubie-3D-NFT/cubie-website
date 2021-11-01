import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { TrxChainId } from 'src/constants';

import { ADD_TRANSACTION, CHECKED_TRANSACTION, FINALIZE_TRANSACTION } from '../mutations';

const now = () => new Date().getTime();

const initialState = {
  [EthChainId.MAINNET]: {},
  [EthChainId.ROPSTEN]: {},
  [BscChainId.MAINNET]: {},
  [BscChainId.TESTNET]: {},
  [TrxChainId.MAINNET]: {},
  [TrxChainId.SHASTA]: {}
};

export default (state = initialState, action) => {
  const txs = state[action.chainId] ?? {};

  switch (action.type) {
    case ADD_TRANSACTION: {
      if (state[action.chainId]?.[action.hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      txs[action.hash] = { hash: action.hash, from: action.from, addedTime: now(), subject: action.subject, approval: action.approval };

      return {
        ...state,
        [action.chainId]: txs,
      };
    }

    case CHECKED_TRANSACTION: {
      const tx = txs?.[action.hash];
      if (!tx) return;
      if (!tx.lastCheckedBlockNumber) tx.lastCheckedBlockNumber = action.blockNumber;
      else tx.lastCheckedBlockNumber = Math.max(action.blockNumber, tx.lastCheckedBlockNumber);

      txs[action.hash] = tx;

      return {
        ...state,
        [action.chainId]: txs,
      };
    }

    case FINALIZE_TRANSACTION: {
      const tx = txs?.[action.hash];
      if (!tx) return;
      tx.receipt = action.receipt;
      tx.confirmedTime = now();

      return {
        ...state,
        [action.chainId]: txs,
      };
    }

    default:
      return state;
  }
};
