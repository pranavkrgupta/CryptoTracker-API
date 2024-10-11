const cron = require("node-cron");
const { fetchCryptoData } = require("../services/cryptoService");
const Crypto = require("../models/cryptoModel");

// Define the function to store data in MongoDB
async function storeCryptoData() {
  try {
    const cryptoData = await fetchCryptoData();

    for (const coinId in cryptoData) {
      const data = cryptoData[coinId];

      // Create and save the cryptocurrency data in the database
      const cryptoRecord = new Crypto({
        coinId,
        name: coinId.charAt(0).toUpperCase() + coinId.slice(1),
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change,
      });

      await cryptoRecord.save();
      console.log(`Saved data for ${coinId}`);
    }
  } catch (error) {
    console.error("Error fetching or storing cryptocurrency data:", error);
  }
}

// Set up the cron job to run every 2 hours
cron.schedule("0 */2 * * *", () => {
  console.log(`Cron job running at ${new Date().toLocaleString()}`);
  storeCryptoData();
});
