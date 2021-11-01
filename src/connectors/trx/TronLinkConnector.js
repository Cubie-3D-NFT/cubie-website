import { __DEV__, CONNECTORS_TYPES } from 'src/constants';
import warning from 'tiny-warning';

import { AbstractTronConnector } from './AbstractTronConnector';

export class NoTronLinkProviderError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No TronLink provider was found on window.tronLink.';
  }
}

export class UserRejectedRequestError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

export class TronLinkConnector extends AbstractTronConnector {
  get type() {
    return CONNECTORS_TYPES.TRX;
  }

  constructor() {
    super();

    this.handleMessage = this.handleMessage.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  async handleMessage(e) {
    if (e.data.message && e.data.message.action == 'setNode') this.handleChainChanged(e.data.message);
    if (e.data.message && e.data.message.action == 'accountsChanged') this.handleAccountsChanged(e.data.message);
    if (e.data.message && e.data.message.action == 'disconnect') this.handleDisconnect(e.data.message);
  }

  async handleChainChanged(msg) {
    if (__DEV__) {
      console.log(`Handling 'chainChanged' event with payload`, msg);
    }
    const chainId = await this.getChainId();
    const provider = await this.getProvider();
    this.emitUpdate({ chainId, provider });
  }

  handleAccountsChanged(msg) {
    if (__DEV__) {
      console.log(`Handling 'accountsChanged' event with payload`, msg);
    }
    this.emitUpdate({ account: msg.data.address });
  }

  handleDisconnect(msg) {
    if (__DEV__) {
      console.log(`Handling 'disconnect' event with payload`, msg);
    }
    this.emitDeactivate();
  }

  async activate() {
    const tronLink = window.tronLink;
    if (!tronLink) {
      throw new NoTronLinkProviderError();
    }

    let tronWeb;
    let account;

    window.addEventListener('message', this.handleMessage);

    // try to activate + request accounts
    try {
      await tronLink.request({ method: 'tron_requestAccounts' });

      if (!tronLink.ready) throw new Error('TronLink is not ready');
      tronWeb = tronLink.tronWeb;

      if (!tronWeb || !tronWeb.ready) throw new Error('TronWeb is not ready');
      account = tronWeb.defaultAddress.base58;
    } catch (err) {
      if (err.code === 4001) {
        throw new UserRejectedRequestError();
      }
      warning(false, `tron_requestAccounts was unsuccessful (${err?.toString()})`);
    }

    return { provider: tronWeb, account };
  }

  async getProvider() {
    const tronLink = window.tronLink;
    if (!tronLink) {
      throw new NoTronLinkProviderError();
    }

    return tronLink?.tronWeb;
  }

  async getChainId() {
    const tronLink = window.tronLink;
    if (!tronLink) {
      throw new NoTronLinkProviderError();
    }

    const { blockID } = await tronLink.tronWeb.trx.getBlockByNumber(0)
    const chainId = blockID ?? -1;

    return chainId;
  }

  async getAccount() {
    const tronLink = window.tronLink;
    if (!tronLink) {
      throw new NoTronLinkProviderError();
    }

    if (!tronLink.ready) throw new Error('TronLink is not ready');

    let account;

    // request accounts
    try {
      const tronWeb = tronLink?.tronWeb;
      if (!tronWeb || !tronWeb.ready) throw new Error('TronWeb is not ready');
      account = tronWeb.defaultAddress.base58;
    } catch (err) {
      warning(false, `tron_accounts was unsuccessful (${err?.toString()})`);
    }

    return account;
  }

  deactivate() {
    window.removeEventListener('message', this.handleMessage);
  }

  async isAuthorized() {
    const tronLink = window.tronLink;
    if (!tronLink) {
      return false
    }

    try {
      return await this.getAccount().then(account => {
        if (account?.length > 0) {
          return true
        } else {
          return false
        }
      })
    } catch {
      return false
    }
  }
}
