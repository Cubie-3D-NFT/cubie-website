import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useProvider(providerId, key) {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers);

  const providerDispatch = useCallback(({ type, ...payload }) => {
    dispatch({ type, id: providerId, key, ...payload });
  });

  const initialStateProvider = { connector: undefined };

  return { provider: providers[providerId][key] ?? initialStateProvider, providerDispatch };
}
