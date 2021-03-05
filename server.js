const express = require('express');
const cors = require("cors");
const path = require('path');

const app = express();

// Allows for two different domains to interact
app.use(cors());

// Database
const db = require('./db/index')

// routes
app.use("/api/v1/test", require('./routes/test'));

// Test db connection
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(err))

// Sync DBs
db.sync()
  .then(() => console.log("Models have been synced..."))
  .catch(err => console.log(err))

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});