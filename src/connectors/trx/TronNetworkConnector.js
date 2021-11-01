import invariant from 'tiny-invariant';
import TronWeb from 'tronweb';

import { AbstractTronConnector } from './AbstractTronConnector';

export class TronNetworkConnector extends AbstractTronConnector {
  providers;
  currentChainId;

  constructor({ urls, defaultChainId }) {
    invariant(defaultChainId || Object.keys(urls).length === 1, 'defaultChainId is a required argument with >1 url');
    super({ supportedChainIds: Object.keys(urls).map((k) => k) });

    this.currentChainId = defaultChainId || Object.keys(urls)[0];
    this.providers = Object.keys(urls).reduce((accumulator, chainId) => {
      const url = urls[chainId];
      accumulator[chainId] = new TronWeb(url, url, url, '');
      return accumulator;
    }, {});
  }

  async activate() {
    return { provider: this.providers[this.currentChainId], chainId: this.currentChainId, account: null };
  }

  async getProvider() {
    return this.providers[this.currentChainId];
  }

  async getChainId() {
    return this.currentChainId;
  }

  async getAccount() {
    return null;
  }

  deactivate() {
    return;
  }

  changeChainId(chainId) {
    invariant(Object.keys(this.providers).includes(chainId.toString()), `No url found for chainId ${chainId}`);
    this.currentChainId = chainId;
    this.emitUpdate({ provider: this.providers[this.currentChainId], chainId });
  }
}
