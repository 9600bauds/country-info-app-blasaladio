import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PopulationChart from '../components/PopulationChart';
import BorderCountriesWidget from '../components/BorderCountriesWidget';

const CountryInfoView = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      const response = await fetch(`/api/countries/${countryCode}`);
      if (!response.ok) {
        const errorText = await response.text(); // Fetch error text if available
        throw new Error(errorText || 'Internal server error!');
      }
      const data = await response.json();
      setCountryInfo(data);
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex align-items-center flex-wrap" style={{ gap: "15px" }}>
            <img
              src={countryInfo.flag}
              className="mr-3"
              style={{ width: "100px", height: "auto", objectFit: "cover" }}
            />
            <h1 className="card-title mb-0">{countryInfo.commonName}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <PopulationChart data={countryInfo.population} />
          </div>
          <div className="col-md-6 mb-4">
            <BorderCountriesWidget borders={countryInfo.borders} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountryInfoView;