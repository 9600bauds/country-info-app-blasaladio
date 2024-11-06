import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountryListView = () => {
  const [countries, setCountries] = useState([]);

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
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>All Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            <Link to={`/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryListView;