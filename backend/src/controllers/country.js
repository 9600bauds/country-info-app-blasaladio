const axios = require('axios');

const getAllCountries = async (req, res) => {
  try {
    if (!process.env.ALL_COUNTRIES_URL) {
      return res.status(500).json({ error: 'Server configuration error: ALL_COUNTRIES_URL is not set in the .env!' });
    }
    const response = await axios.get(process.env.ALL_COUNTRIES_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the list of countries!' }); //Unspecified server error
  }
};

const getCountryInfo = async (req, res) => {
  try {
    const { countryCode } = req.params;
    if (!countryCode) {
      return res.status(400).json({ error: 'Country code is required!' });
    }

    // We only have the country code yet, so we need to do an initial query to get more info.
    // Ideally this endpoint would tell us the ISO2 and ISO3 codes, but unfortunately, the country's common name is what we have to work with.
    const countryInfoResponse = await axios.get(`${process.env.COUNTRY_INFO_BASE_URL}/${countryCode}`);

    const countryCommonName = countryInfoResponse.data.commonName;
    if (!countryCommonName) {
      return res.status(404).json({ error: `Could not fetch info for country code ${countryCode}!` });
    }

    // With the country's common name, we can make the other requests, now.
    // I'm not a fan of the destructuring here, I'd prefer to have each const be explicitly declared in one line. But this works for having parallel requests.
    const [populationResponse, flagResponse] = await Promise.all([
      axios.post(
        process.env.POPULATION_BASE_URL,
        { "country": countryCommonName }
      ),
      axios.post(
        process.env.FLAGS_BASE_URL,
        { "country": countryCommonName }
      ),
    ])

    const borderCountries = countryInfoResponse.data.borders; // This info was in our very first query
    const populationData = populationResponse.data.data.populationCounts; // Note data.data, the promise's data field includes a data field
    const flagUrl = flagResponse.data.data.flag; // Note data.data, the promise's data field includes a data field

    //Respond with json data
    res.json({
      "borders": borderCountries,
      "population": populationData,
      "flag": flagUrl
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log("Internal error in the country controller:", error) //Some more robust logging is needed here
    }
    res.status(500).json({ error: 'Error fetching country info' });
  }
};

module.exports = {
  getAllCountries,
  getCountryInfo
};