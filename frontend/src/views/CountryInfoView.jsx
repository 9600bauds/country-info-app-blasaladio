import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h1>{countryInfo.commonName}</h1>
      <img src={countryInfo.flag} />

      <h2>Border Countries</h2>
      <ul>
        {countryInfo.borders.map((border) => (
          <li key={border.countryCode}>
            <a href={`/${border.countryCode}`}>{border.commonName}</a>
          </li>
        ))}
      </ul>

      <h2>Population</h2>
      TODO
    </div>
  );
};

export default CountryInfoView;