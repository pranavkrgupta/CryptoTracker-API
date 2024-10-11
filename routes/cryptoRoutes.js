// defining route to fetch cryptocurrency data via API

const express = require("express");
const { getCryptoStats } = require("../controllers/cryptoController");
const router = express.Router();

// Route to get the latest stats of a cryptocurrency
router.get("/stats", getCryptoStats);

module.exports = router;
