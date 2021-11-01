import { SET_BLOCK_NUMBER, SET_NETWORK, SET_NETWORK_MISSMATCH } from '../mutations';

const initialState = {
  network: 'trx',
  networkMissmatch: false,
  blockNumber: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NETWORK:
      return {
        ...state,
        network: action.network,
      };
    case SET_NETWORK_MISSMATCH:
      return {
        ...state,
        networkMissmatch: action.missmatch,
      };
    case SET_BLOCK_NUMBER:
      return {
        ...state,
        blockNumber: {
          [action.chainId]:
            typeof state.blockNumber[action.chainId] !== 'number' ? action.blockNumber : Math.max(action.blockNumber, state.blockNumber[action.chainId]),
        },
      };
    default:
      return state;
  }
};
