import { Button } from '@chakra-ui/react';
import { ChainId as BscChainId } from '@pancakeswap/sdk';
import { ChainId as EthChainId } from '@uniswap/sdk';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoinbaseWalletIcon from 'src/assets/images/providers/coinbaseWalletIcon.svg';
import FortmaticIcon from 'src/assets/images/providers/fortmaticIcon.png';
import PortisIcon from 'src/assets/images/providers/portisIcon.png';
import TronLinkIcon from 'src/assets/images/providers/tronLinkIcon.png';
import WalletConnectIcon from 'src/assets/images/providers/walletConnectIcon.svg';
import { fortmatic, injected, portis, tronLink, walletconnect, walletlink } from 'src/connectors';
import { TrxChainId } from 'src/constants';
import { useToggleModal } from 'src/hooks/useToggleModal';
import { useNetworkUnifiedWeb3, useUnifiedWeb3 } from 'src/hooks/useUnifiedWeb3';
import { SET_NETWORK_MISSMATCH } from 'src/store';
import { shortenAddress } from 'src/utils';
import styled from 'styled-components';

import Identicon from '../Identicon';

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`;

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }) {
  if (connector === injected) {
    return <Identicon />;
  }
  if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} />
      </IconWrapper>
    );
  }
  if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} />
      </IconWrapper>
    );
  }
  if (connector === fortmatic) {
    return (
      <IconWrapper size={16}>
        <img src={FortmaticIcon} />
      </IconWrapper>
    );
  }
  if (connector === portis) {
    return (
      <IconWrapper size={16}>
        <img src={PortisIcon} />
      </IconWrapper>
    );
  }
  if (connector === tronLink) {
    return (
      <IconWrapper size={16}>
        <img src={TronLinkIcon} />
      </IconWrapper>
    );
  }
  return null;
}

function Web3StatusInner() {
  const dispatch = useDispatch();

  const { chainId, account, connector, error } = useUnifiedWeb3();

  const toggleWalletModal = useToggleModal('walletManager');

  const appNetwork = useSelector((state) => state.app.network);
  const networkMissmatch = useSelector((state) => state.app.networkMissmatch);

  useEffect(() => {
    if (!account) {
      dispatch({ type: SET_NETWORK_MISSMATCH, missmatch: false });
      return;
    }

    switch (appNetwork) {
      case 'eth':
        dispatch({ type: SET_NETWORK_MISSMATCH, missmatch: chainId != EthChainId.MAINNET && chainId != EthChainId.ROPSTEN });
        break;

      case 'bsc':
        dispatch({ type: SET_NETWORK_MISSMATCH, missmatch: chainId != BscChainId.MAINNET && chainId != BscChainId.TESTNET });
        break;

      case 'trx':
        dispatch({ type: SET_NETWORK_MISSMATCH, missmatch: chainId != TrxChainId.MAINNET && chainId != TrxChainId.SHASTA });
        break;
    }
  }, [chainId, appNetwork, account]);

  if (error || networkMissmatch) {
    return (
      <Button colorScheme="red" variant="solid" size="sm" onClick={() => toggleWalletModal()}>
        {error instanceof UnsupportedChainIdError || networkMissmatch ? 'Wrong Network' : 'Error'}
      </Button>
    );
  }
  if (account) {
    return (
      <Button colorScheme="brand" variant="outline" size="sm" onClick={() => toggleWalletModal()}>
        {shortenAddress(account)}
        {connector && <StatusIcon connector={connector} />}
      </Button>
    );
  }
  return (
    <Button colorScheme="brand" variant="outline" size="sm" onClick={() => toggleWalletModal()}>
      Connect to a wallet
    </Button>
  );
}

export default function Web3Status() {
  const { active } = useUnifiedWeb3();
  const { active: networkActive } = useNetworkUnifiedWeb3();
  
  if (!networkActive && !active) {
    return null;
  }

  return <Web3StatusInner />;
}
