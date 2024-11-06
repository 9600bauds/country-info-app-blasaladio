const BorderCountry = ({ countryCode, commonName }) => {
  return (
    <li className="list-group-item">
      <a href={`/${countryCode}`} className="text-decoration-none">
        {commonName}
      </a>
    </li>
  );
};

export default BorderCountry;