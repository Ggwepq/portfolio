import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Archive from './Archive';
import ProjectDetail from './components/ProjectDetails';
import ResumeViewer from './components/ResumeViewer';
import ChatCompanion from './components/ChatCompanion';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/resume" element={<ResumeViewer />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
      <ChatCompanion />
    </Router>
  );
}

export default App;
