import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { tronNetwork, web3ReactNetwork } from 'src/connectors';
import { useEagerConnect, useInactiveListener } from 'src/hooks';
import { useNetworkUnifiedWeb3, useUnifiedWeb3 } from 'src/hooks/useUnifiedWeb3';

import CircleLoader from '../Loaders/CircleLoader';

export default function Web3Manager({ children }) {
  // const { active } = useWeb3React();
  // const { active: networkActive, error: networkError, activate: activateNetwork, chainId } = useWeb3React(NetworkContextName);

  const { active } = useUnifiedWeb3();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useNetworkUnifiedWeb3();

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const appNetwork = useSelector((state) => state.app.network);
  const [previousAppNetwork, setPreviousAppNetwork] = useState(appNetwork);

  const networkConnector = useMemo(() => {
    if (appNetwork == 'eth' || appNetwork == 'bsc') {
      return web3ReactNetwork(appNetwork);
    } else if (appNetwork == 'trx') {
      return tronNetwork();
    }
  }, [appNetwork]);

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(networkConnector);
    }
  }, [triedEager, active, networkActive, networkError, activateNetwork, networkConnector]);

  // after network change, re-activate connectors
  useEffect(() => {
    if (previousAppNetwork !== appNetwork) {
      activateNetwork(networkConnector);
      setPreviousAppNetwork(appNetwork);
    }
  }, [appNetwork, activateNetwork]);


  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists for web3-react only
  useInactiveListener(!triedEager);

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return <span>Unknown error</span>;
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? <CircleLoader /> : null;
  }

  return children;
}
