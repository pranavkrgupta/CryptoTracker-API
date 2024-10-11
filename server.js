const express = require("express");
const connectDB = require("/config/db");
require("dotenv").config();
require("./jobs/cryptoJob"); // start the background job

const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();

//connect to mongoDB
connectDB();

app.use("/api", cryptoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
