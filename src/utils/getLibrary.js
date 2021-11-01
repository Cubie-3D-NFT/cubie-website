import { Web3Provider } from '@ethersproject/providers';

export function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}

export function getTronLibrary(provider) {
  return null;
}