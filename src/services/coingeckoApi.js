import axios from 'axios';

const coingeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export const getMarketChartByContractAddr = (networkIdentifier, contractAddr, days = 'max', currency = 'usd') => {
  return coingeckoApi.get(`coins/${networkIdentifier}/contract/${contractAddr}/market_chart/?vs_currency=${currency}&days=${days}`);
};
