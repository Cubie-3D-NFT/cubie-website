import { EventEmitter } from 'events';
import { __DEV__ } from 'src/constants';

export const TronConnectorEvent = {
  Update: 'TronConnectorUpdate',
  Error: 'TronConnectorError',
  Deactivate: 'TronConnectorDeactivate',
};

export class AbstractTronConnector extends EventEmitter {
  constructor() {
    super();
  }

  async activate() {
    return { provider: null, chainId: null, account: null };
  }
  
  async getProvider() {
    return null;
  }

  async getChainId() {
    return null;
  }

  async getAccount() {
    return null;
  }

  deactivate() {}

  emitUpdate(update) {
    if (__DEV__) {
      console.log(`Emitting '${TronConnectorEvent.Update}' with payload`, update);
    }
    this.emit(TronConnectorEvent.Update, update);
  }

  emitError(error) {
    if (__DEV__) {
      console.log(`Emitting '${TronConnectorEvent.Error}' with payload`, error);
    }
    this.emit(TronConnectorEvent.Error, error);
  }

  emitDeactivate() {
    if (__DEV__) {
      console.log(`Emitting '${TronConnectorEvent.Deactivate}'`);
    }
    this.emit(TronConnectorEvent.Deactivate);
  }
}
