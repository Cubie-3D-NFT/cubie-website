import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { TrxChainId } from 'src/constants';
import { useActiveUnifiedWeb3 } from 'src/hooks/useUnifiedWeb3';
import { SET_NETWORK } from 'src/store';

export default function NetworkManager() {
  // app state
  const { chainId } = useActiveUnifiedWeb3();

  const dispatch = useDispatch();
  const appNetwork = useSelector((state) => state.app.network);

  /*
  const location = useLocation();
  const network = useMemo(() => {
    let _network = 'eth';

    const afterSlash = location?.pathname?.split('/')[1];
    if (afterSlash.indexOf('/') !== -1) _network = afterSlash.split('/')[0];
    else _network = afterSlash;

    return _network;
  }, [location]);

  useEffect(() => {
    if (network && NETWORK_VALUES.includes(network) && network !== appNetwork) {
      dispatch({ type: SET_NETWORK, network: network });
    }
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (chainId && network !== CHAIN_ID_NETWORK_VALUES[chainId]) {
      history.push(`/${CHAIN_ID_NETWORK_VALUES[chainId]}`);
    }
  }, [chainId]);
  */

  return null;
}

export const NETWORK_VALUES = ['eth', 'bsc', 'trx'];

export const CHAIN_ID_NETWORK_VALUES = {
  [EthChainId.MAINNET]: NETWORK_VALUES[0],
  [EthChainId.ROPSTEN]: NETWORK_VALUES[0],

  [BscChainId.MAINNET]: NETWORK_VALUES[1],
  [BscChainId.TESTNET]: NETWORK_VALUES[1],

  [TrxChainId.MAINNET]: NETWORK_VALUES[2],
  [TrxChainId.SHASTA]: NETWORK_VALUES[2],
};
