import BorderCountry from "./BorderCountry";

const BorderCountriesWidget = ({ borders }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Bordering Countries</h2>
        <ul className="list-group">
          {borders.map((border) => (
            <BorderCountry
              key={border.countryCode}
              countryCode={border.countryCode}
              commonName={border.commonName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BorderCountriesWidget;