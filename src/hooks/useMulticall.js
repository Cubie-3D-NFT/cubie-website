import { Multicall } from 'ethereum-multicall';
import { useMemo } from 'react';

import { useActiveWeb3React } from '.';

export function useMulticall({ tryAggregate } = { tryAggregate: false }) {
  const { chainId, library } = useActiveWeb3React();

  const multicall = useMemo(() => new Multicall({ ethersProvider: library, tryAggregate: tryAggregate }), [chainId, library, tryAggregate]);
  return multicall;
}
