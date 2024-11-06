import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CountryListView from './views/CountryListView';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CountryListView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;