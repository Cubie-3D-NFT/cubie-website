import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { TronConnectorEvent } from 'src/connectors/trx/AbstractTronConnector';
import { NetworkContextName, PROVIDERS } from 'src/constants';
import { ACTIVATE_PROVIDER, DEACTIVATE_PROVIDER, PROVIDER_ERRORED, PROVIDER_ERRORED_FROM_ACTIVATION, UPDATE_PROVIDER, UPDATE_PROVIDER_FROM_ERROR } from 'src/store';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import { useProvider } from './useProvider';

export function useTronWeb(key) {
  return useContext(getTronWebContext(key));
}

export const PRIMARY_KEY = 'primary';
const CONTEXTS = {};

export function createTronWebRoot(key) {
  invariant(!CONTEXTS[key], `A root already exists for provided key ${key}`);

  CONTEXTS[key] = createContext({
    activate: async () => {
      invariant(false, 'No <TronWebProvider ... /> found.');
    },
    setError: () => {
      invariant(false, 'No <TronWebProvider ... /> found.');
    },
    deactivate: () => {
      invariant(false, 'No <TronWebProvider ... /> found.');
    },
    active: false,
  });
  CONTEXTS[key].displayName = `TronWebContext - ${key}`;

  const Provider = CONTEXTS[key].Provider;

  return function TronWebProvider({ getLibrary, children }) {
    const {
      connector,
      provider,
      chainId,
      account,

      activate,
      setError,
      deactivate,

      error,
    } = useTronWebManager(key);

    const active = connector !== undefined && chainId !== undefined && account !== undefined && !!!error;
    const library = useMemo(() => (active && chainId !== undefined && Number.isInteger(chainId) && !!connector ? getLibrary(provider, connector) : undefined), [
      active,
      getLibrary,
      provider,
      connector,
    ]);

    const tronWebContext = {
      connector,
      library,
      chainId,
      account,

      activate,
      setError,
      deactivate,

      active,
      error,
    };

    return <Provider value={tronWebContext}>{children}</Provider>;
  };
}

/* Context */

export const TronWebProvider = createTronWebRoot(PRIMARY_KEY);

export function getTronWebContext(key = PRIMARY_KEY) {
  invariant(Object.keys(CONTEXTS).includes(key), `Invalid key ${key}`);
  return CONTEXTS[key];
}

/* Update */

async function augmentConnectorUpdate(connector, update) {
  const provider = update.provider === undefined ? await connector.getProvider() : update.provider;
  const [_chainId, _account] = await Promise.all([
    update.chainId === undefined ? connector.getChainId() : update.chainId,
    update.account === undefined ? connector.getAccount() : update.account,
  ]);

  /*
  const chainId = normalizeChainId(_chainId)
  if (!!connector.supportedChainIds && !connector.supportedChainIds.includes(chainId)) {
    throw new UnsupportedChainIdError(chainId, connector.supportedChainIds)
  }
  */

  return { provider, chainId: _chainId, account: _account };
}

/* Manager */

export function useTronWebManager(key) {
  const { provider: tronProvider, providerDispatch } = useProvider(PROVIDERS.TRON, key);
  const { connector, provider, chainId, account, error } = tronProvider;

  const updateBusterRef = useRef(-1);
  updateBusterRef.current += 1;

  const activate = useCallback(async (connector, throwErrors = false) => {
    const updateBusterInitial = updateBusterRef.current;

    let activated = false;
    try {
      const update = await connector.activate().then((update) => {
        activated = true;
        return update;
      });

      const augmentedUpdate = await augmentConnectorUpdate(connector, update);

      if (updateBusterRef.current > updateBusterInitial) {
        throw new StaleConnectorError();
      }
      providerDispatch({ type: ACTIVATE_PROVIDER, connector, ...augmentedUpdate });
    } catch (error) {
      if (error instanceof StaleConnectorError) {
        activated && connector.deactivate();
        warning(false, `Suppressed stale connector activation ${connector}`);
      } else if (throwErrors) {
        activated && connector.deactivate();
        throw error;
      } else {
        // we don't call activated && connector.deactivate() here because it'll be handled in the useEffect
        providerDispatch({ type: PROVIDER_ERRORED_FROM_ACTIVATION, connector, error });
      }
    }
  }, []);

  const setError = useCallback((error) => {
    providerDispatch({ type: PROVIDER_ERRORED, error });
  }, []);

  const deactivate = useCallback(() => {
    providerDispatch({ type: DEACTIVATE_PROVIDER });
  }, []);

  const handleUpdate = useCallback(
    async (update) => {
      const updateBusterInitial = updateBusterRef.current;

      // updates are handled differently depending on whether the connector is active vs in an error state
      if (!error) {
        providerDispatch({ type: UPDATE_PROVIDER, provider: update.provider, chainId: update.chainId, account: update.account });
      } else {
        try {
          const augmentedUpdate = await augmentConnectorUpdate(connector, update);

          if (updateBusterRef.current > updateBusterInitial) {
            throw new StaleConnectorError();
          }
          providerDispatch({ type: UPDATE_PROVIDER_FROM_ERROR, ...augmentedUpdate });
        } catch (error) {
          if (error instanceof StaleConnectorError) {
            warning(false, `Suppressed stale connector update from error state ${connector} ${update}`);
          } else {
            // though we don't have to, we're re-circulating the new error
            providerDispatch({ type: PROVIDER_ERRORED, error });
          }
        }
      }
    },
    [connector, error]
  );

  const handleError = useCallback((error) => {
    providerDispatch({ type: PROVIDER_ERRORED, error });
  }, []);

  const handleDeactivate = useCallback(() => {
    providerDispatch({ type: DEACTIVATE_PROVIDER });
  }, []);

  // ensure that connectors which were set are deactivated
  useEffect(() => {
    return () => {
      if (connector) {
        connector.deactivate();
      }
    };
  }, [connector]);

  // ensure that events emitted from the set connector are handled appropriately
  useEffect(() => {
    if (connector) {
      connector.on(TronConnectorEvent.Update, handleUpdate).on(TronConnectorEvent.Error, handleError).on(TronConnectorEvent.Deactivate, handleDeactivate);
    }

    return () => {
      if (connector) {
        connector.off(TronConnectorEvent.Update, handleUpdate).off(TronConnectorEvent.Error, handleError).off(TronConnectorEvent.Deactivate, handleDeactivate);
      }
    };
  }, [connector, handleUpdate, handleError, handleDeactivate]);

  return { connector, provider, chainId, account, activate, setError, deactivate, error };
}

class StaleConnectorError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}
