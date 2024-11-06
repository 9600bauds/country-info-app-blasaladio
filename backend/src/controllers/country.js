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
  async function fetchGeneralInfo(countryCode) {
    try {
      const response = await axios.get(`${process.env.COUNTRY_INFO_BASE_URL}/${countryCode}`);
      return response;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching general country data: ${error.message}`);
      }
      throw new Error(`Error fetching general country data: ${error.message}`);
    }
  }

  async function fetchPopulation(countryCommonName) {
    try {
      const response = await axios.post(
        process.env.POPULATION_BASE_URL,
        { "country": countryCommonName }
      );
      return response.data.data.populationCounts;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching population data: ${error.message}`);
      }
      throw new Error(`Error fetching population data: ${error.message}`);
    }
  }

  async function fetchFlag(countryCommonName) {
    try {
      const response = await axios.post(
        process.env.FLAGS_BASE_URL,
        { "country": countryCommonName }
      );
      return response.data.data.flag;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching flag data: ${error.message}`);
      }
      throw new Error(`Error fetching flag data: ${error.message}`);
    }
  }

  try {
    const { countryCode } = req.params;

    // We only have the country code yet, so we need to do an initial query to get more info.
    // Ideally this endpoint would tell us the ISO2 and ISO3 codes, but unfortunately, the country's common name is what we have to work with.
    const countryInfoResponse = await fetchGeneralInfo(countryCode);

    const countryCommonName = countryInfoResponse.data.commonName;
    if (!countryCommonName) {
      return res.status(404).json({ error: `Could not fetch info for country code ${countryCode}!` });
    }

    // With the country's common name, we can make the other requests, now.
    // I'm not a fan of the destructuring here, I'd prefer to have each const be explicitly declared in one line. But this works for having parallel requests.
    const [borderCountries, populationData, flagUrl] = await Promise.all([
      countryInfoResponse.data.borders, // This info was in our very first query
      fetchPopulation(countryCommonName),
      fetchFlag(countryCommonName),
    ])

    //Respond with json data
    res.json({
      "commonName": countryCommonName,
      "borders": borderCountries,
      "population": populationData,
      "flag": flagUrl
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log("Internal error in the country controller:", error.message) //Some more robust logging is needed here
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountryInfo
};