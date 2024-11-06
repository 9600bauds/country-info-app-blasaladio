const axios = require('axios');

const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get(process.env.ALL_COUNTRIES_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the list of countries!' }); //500: Internal Server Error
  }
};

module.exports = {
  getAllCountries
};