// This file will fetch data from CoinGecko API

const axios = require("axios");

const COINS = ["bitcoin", "matic-network", "ethereum"];

async function fetchCryptoData() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: COINS.join(","),
          vs_currencies: "usd",
          include_market_cap: "true",
          include_24hr_change: "true",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching cryptocurrency data: ${error}`);
    throw error;
  }
}

module.exports = { fetchCryptoData };
