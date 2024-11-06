const express = require('express');
const { getAllCountries } = require('../controllers/country');

const router = express.Router();

router.get('/', getAllCountries);

module.exports = router;