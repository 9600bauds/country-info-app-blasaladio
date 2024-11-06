import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorView from './ErrorView';

const CountryListView = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  // Empty array useEffect, execute once upon page load and then never again
  useEffect(() => {
    // We need to define this as an async function for it to properly work in the useEffect
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries/');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error); // Todo: use some sort of toast notification?
        setError(`Error fetching countries: ${error}`);
      }
    };

    fetchCountries();
  }, []);

  if (error) {
    return (
      <ErrorView error={error}/>
    );
  }

  return (
    <div className="container bg-light py-5">
      <div className="container">
        <h1 className="mb-4 text-center">All Countries</h1>
        <ul className="list-group">
          {countries.map((country) => (
            <li key={country.code} className="list-group-item list-group-item-action">
              <Link to={`/${country.countryCode}`}>
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryListView;