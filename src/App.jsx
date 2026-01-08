import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Archive from './Archive';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Router>
  );
}

export default App;
