import { ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { ExternalLink as LinkIcon } from 'react-feather';
import TronLinkIcon from 'src/assets/images/providers/tronLinkIcon.png';
import { injected, tronLink } from 'src/connectors';
import { SUPPORTED_WALLETS } from 'src/constants';
import { useActiveUnifiedWeb3 } from 'src/hooks/useUnifiedWeb3';
import { getExplorerLink, shortenAddress } from 'src/utils';
import styled from 'styled-components';

import Identicon from '../Identicon';
import Copy from './Copy';

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid rgb(206, 208, 217);
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;

const AccountGroupingRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: black;

  div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
`;

const AccountSection = styled.div`
  padding: 0 1rem;
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
  color: black;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled.a`
  font-size: 0.825rem;
  color: #888d9b;
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: #565a69;
  }
`;

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: #888d9b;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`;

export function formatConnectorName(connector) {
  const { ethereum } = window;
  const isMetaMask = !!(ethereum && ethereum.isMetaMask);
  const name = Object.keys(SUPPORTED_WALLETS)
    .filter((k) => SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK')))
    .map((k) => SUPPORTED_WALLETS[k].name)[0];
  return name;
}

export default function AccountDetails({ openOptions }) {
  const { chainId, account, connector } = useActiveUnifiedWeb3();

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <IconWrapper size={16}>
          <Identicon />
        </IconWrapper>
      );
    }
    if (connector === tronLink) {
      return (
        <IconWrapper size={16}>
          <img src={TronLinkIcon} alt="tronlink logo" />
        </IconWrapper>
      );
    }
    return null;
  }

  return (
    <>
      <ModalHeader>Account</ModalHeader>
      <ModalCloseButton />
      <AccountSection>
        <YourAccount>
          <InfoCard>
            <AccountGroupingRow>
              <WalletName>Connected with {formatConnectorName(connector)}</WalletName>
              <div>
                {connector !== injected && connector !== walletlink && connector !== tronLink && (
                  <button
                    variant="action"
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    onClick={() => {
                      connector.close();
                    }}
                  >
                    Disconnect
                  </button>
                )}
                {/*
                <button
                  style={{ fontSize: '.825rem', fontWeight: 400 }}
                  onClick={() => {
                    openOptions();
                  }}
                >
                  Change
                </button>
                */}
              </div>
            </AccountGroupingRow>
            <AccountGroupingRow id="web3-account-identifier-row">
              <AccountControl>
                <>
                  <div>
                    {getStatusIcon()}
                    <p> {account && shortenAddress(account)}</p>
                  </div>
                </>
              </AccountControl>
            </AccountGroupingRow>
            <AccountGroupingRow>
              <>
                <AccountControl>
                  <div>
                    {account && (
                      <Copy toCopy={account}>
                        <span style={{ marginLeft: '4px' }}>Copy Address</span>
                      </Copy>
                    )}
                    {chainId && account && (
                      <AddressLink hasENS={false} isENS={false} href={getExplorerLink(chainId, account, 'address')} target="_blank">
                        <LinkIcon size={16} />
                        <span style={{ marginLeft: '4px' }}>View on Explorer</span>
                      </AddressLink>
                    )}
                  </div>
                </AccountControl>
              </>
            </AccountGroupingRow>
          </InfoCard>
        </YourAccount>
      </AccountSection>
    </>
  );
}
