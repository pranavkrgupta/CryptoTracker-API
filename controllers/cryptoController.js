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

module.exports = { getCryptoStats };
