const express = require('express');
const { getAllCountries, getCountryInfo } = require('../controllers/country');

const router = express.Router();

router.get('/', getAllCountries);
router.get('/:countryCode', getCountryInfo);

module.exports = router;