// the background job that runs every 2 hours to fetch and store cryptocurrency data

const cron = require("node-cron");
const Crypto = require("../models/cryptoModel");
const { fetchCryptoData } = require("../services/cryptoService");

async function storeCryptoData() {
  try {
    const cryptoData = await fetchCryptoData();
    for (const coinId in cryptoData) {
      const data = cryptoData[coinId];
      const cryptoRecord = new Crypto({
        coidId,
        name: coinId.charaAt(0).toUpperCase() + coinId.slice(1),
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change,
      });
      await cryptoRecord.save();
      console.log(`Saved data for ${coinId}`);
    }
  } catch (error) {
    console.error(`Error storing cryptocurrency data: ${error}`);
  }
}

cron.schedule("0 */2 * * *", () => {
  console.log(`Fetching and storing cryptocurrency data ...`);
  storeCryptoData();
});
