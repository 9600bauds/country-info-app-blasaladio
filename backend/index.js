const express = require('express');
const dotenv = require('dotenv');
const countryRouter = require('./src/routes/countries');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/api/countries', countryRouter);

app.listen(port, () => {
  console.log(`Country Info App backend is running on port ${port}`);
});