import { PROVIDERS } from 'src/constants';

import { ACTIVATE_PROVIDER, DEACTIVATE_PROVIDER, PROVIDER_ERRORED, PROVIDER_ERRORED_FROM_ACTIVATION, UPDATE_PROVIDER, UPDATE_PROVIDER_FROM_ERROR } from '../mutations';

const initialState = {
  [PROVIDERS.TRON]: {},
};

export default (state = initialState, action) => {
  const { id, key, connector, provider, chainId, account, error } = action;
  switch (action.type) {
    case ACTIVATE_PROVIDER:
      return {
        ...state,
        [id]: {
          ...state[id],
          [key]: { connector, provider, chainId, account },
        },
      };
    case UPDATE_PROVIDER:
      return {
        ...state,
        [id]: {
          ...state[id],
          [key]: {
            ...(provider === undefined ? {} : { provider }),
            ...(chainId === undefined ? {} : { chainId }),
            ...(account === undefined ? {} : { account }),
          },
        },
      };
    case UPDATE_PROVIDER_FROM_ERROR:
      return {
        ...state,
        [id]: {
          ...state[id],
          [key]: {
            ...(provider === undefined ? {} : { provider }),
            ...(chainId === undefined ? {} : { chainId }),
            ...(account === undefined ? {} : { account }),
            error: undefined,
          },
        },
      };
    case PROVIDER_ERRORED:
      return {
        ...state,
        [id]: {
          ...state[id],
          [key]: { ...state[id][key].connector, error },
        },
      };
    case PROVIDER_ERRORED_FROM_ACTIVATION:
      return {
        ...state,
        [id]: {
          ...state.id,
          [key]: { connector, error },
        },
      };
    case DEACTIVATE_PROVIDER:
      return {
        ...state,
        [id]: {
          ...state.id,
          [key]: {},
        },
      };
    default:
      return state;
  }
};
