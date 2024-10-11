// defining route to fetch cryptocurrency data via API

const express = require("express");
const {
  getCryptoStats,
  getCryptoPriceDeviation,
} = require("../controllers/cryptoController");
const router = express.Router();

// Route to get the latest stats of a cryptocurrency
router.get("/stats", getCryptoStats);

// Route to get the standard deviation of the  price for the last 100 records
router.get("/deviation", getCryptoPriceDeviation);

module.exports = router;
