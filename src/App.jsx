import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Archive from './Archive';
import './App.css';
import ProjectDetail from './components/ProjectDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/ds-monitor" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
