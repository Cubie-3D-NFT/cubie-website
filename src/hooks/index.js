import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { injected, tronLink } from 'src/connectors';
import { NetworkContextName } from 'src/constants';

import { useTronWeb } from './useTronWeb';

export function useActiveWeb3React() {
  const context = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  // app state
  const appNetwork = useSelector((state) => state.app.network);

  const { active: web3Active, activate: activateWeb3 } = useWeb3React();
  const { active: tronActive, activate: activateTron } = useTronWeb();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (appNetwork == 'eth' || appNetwork == 'bsc') {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activateWeb3(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else if (isMobile && window.ethereum) {
          activateWeb3(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    } else if (appNetwork == 'trx') {
      tronLink.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activateTron(tronLink, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }
  }, [activateWeb3, activateTron]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (web3Active || tronActive) {
      setTried(true);
    }
  }, [web3Active, tronActive]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}
