import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryListView from './views/CountryListView';
import CountryInfoView from './views/CountryInfoView';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CountryListView />} />
          <Route path="/:countryCode" element={<CountryInfoView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;