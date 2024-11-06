import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import PopulationChart from '../components/PopulationChart';
import BorderCountriesWidget from '../components/BorderCountriesWidget';
import ErrorView from './ErrorView';

const CountryInfoView = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      const response = await fetch(`/api/countries/${countryCode}`);
      if (!response.ok) {
        const errorText = await response.text() || `Internal server error!`;
        setError(errorText);
        throw new Error(errorText);
      }
      const data = await response.json();
      setCountryInfo(data);
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (error) {
    return (
      <ErrorView error={error}>
        <Link className="btn btn-info" to={`/`}>← Back to all countries</Link>
      </ErrorView>
    );
  }
  
  if (!countryInfo) {
    return <div className="container text-center py-5">Loading...</div>;
  }
  
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex align-items-center flex-wrap" style={{ gap: `15px` }}>
            <img
              src={countryInfo.flag}
              className="mr-3"
              style={{ width: `100px`, height: `auto`, objectFit: `cover` }}
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

        <Link className="btn btn-info" to={`/`}>← Back to all countries</Link>
        
      </div>
    </div>
  );
};

export default CountryInfoView;