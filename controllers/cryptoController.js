// controller for handling API requests for fetching crypto data

// we'll create an API [/stats] to fetch the most recent cryptocurrency data from database for a given coin

const Crypto = require("../models/cryptoModel");

// API to fetch the latest data about the requested cryptocurrency
async function getCryptoStats(req, res) {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });

    if (!latestData) {
      return res
        .status(404)
        .json({ message: `Data not found for the requested cryptocurrency` });
    }
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: `Error fetching cryptocurrency data` });
  }
}

// Utility function to calculate standard deviation
function calculateStandardDeviation(prices) {
  const n = prices.length;
  const mean = prices.reduce((a, b) => a + b, 0) / n;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Math.sqrt(variance);
}

// API to calculate the standard deviation of the price for the last 100 records
async function getCryptoPriceDeviation(req, res) {
  const { coin } = req.query;
  try {
    const priceRecords = await Crypto.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select("price");

    if (!priceRecords || priceRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No sufficient data to calculate deviation" });
    }

    const prices = priceRecords.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);
    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Error calculating price deviation" });
  }
}
module.exports = { getCryptoStats, getCryptoPriceDeviation };
