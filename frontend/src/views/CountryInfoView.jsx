import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import PopulationChart from '../components/PopulationChart';
import BorderCountriesWidget from '../components/BorderCountriesWidget';



const CountryInfoView = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(`/api/countries/${countryCode}`);
        const data = await response.json();
        setCountryInfo(data);
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

return (
    <div className="container-fluid bg-light py-5">
      <div className="container">

        <div className="card shadow-sm">
          <img src={countryInfo.flag} className="card-img-top" alt={countryInfo.commonName} />
          <div className="card-body">
            <h1 className="card-title">{countryInfo.commonName}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <PopulationChart data={countryInfo.population} />
          </div>
          <div className="col-md-6">
            <BorderCountriesWidget borders={countryInfo.borders} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountryInfoView;