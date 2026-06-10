import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';
import '../Dashboard.css';
import {
  FaDesktop,
  FaMobileAlt,
  FaFileAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaArrowLeft,
  FaBriefcase,
  FaRobot,
  FaUsers,
  FaSearch,
  FaExternalLinkAlt
} from 'react-icons/fa';

const projectNames = {
  trackwise: 'TrackWise',
  bis: 'Barangay Info System',
  preplus: 'Preplus GMS',
  bnb: 'BrewsNBites',
  flixtochill: 'FlixToChill',
  watchlist: 'Watchlist API',
  caveman: 'Caveman Poetry',
  portfolio: 'Personal Website',
  alams: 'ALAMS Attendance',
  moneysense: 'MoneySense',
  hand2voice: 'Hand2Voice',
  'samurai-revenge': "Samurai's Revenge",
  'kings-knight': "King's Knight",
  'forest-escape': 'Forest Escape'
};

function Dashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'employers', 'real'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !db) return;

    try {
      const q = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            // Fallback fields for older records
            clickedResume: docData.clickedResume || false,
            clickedLinkedIn: docData.clickedLinkedIn || false,
            clickedGithub: docData.clickedGithub || false,
            sentMessage: docData.sentMessage || false,
            isLikelyEmployer: docData.isLikelyEmployer || false,
            referrer: docData.referrer || '',
            refParam: docData.refParam || '',
            viewedProjects: docData.viewedProjects || [],
            time: docData.timestamp ? docData.timestamp.toDate().toLocaleString() : 'Unknown time',
            jsTimestamp: docData.timestamp ? docData.timestamp.toDate() : null
          };
        });
        setVisitors(data);
      }, (error) => {
        console.error("Error listening to visitors: ", error);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up visitor listener: ", error);
    }
  }, [isAuthenticated]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (password === 'cedjuani') {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password');
        setPassword('');
      }
    }
  };

  // Check if ISP is a cloud provider or bot
  const isBotOrCloud = (isp) => {
    if (!isp) return false;
    const botKeywords = /amazon|google|microsoft|digitalocean|cloudflare|oracle|hosting|clouddns|crawler|bot|ahrefs|semrush/i;
    return botKeywords.test(isp);
  };

  // Filter visitors
  const filteredVisitors = visitors.filter((v) => {
    // 1. Tag filters
    if (filter === 'employers' && !v.isLikelyEmployer) return false;
    if (filter === 'real' && isBotOrCloud(v.isp)) return false;

    // 2. Search text filter
    if (searchTerm.trim() !== '') {
      const search = searchTerm.toLowerCase();
      const locationMatch = v.location?.toLowerCase().includes(search);
      const ispMatch = v.isp?.toLowerCase().includes(search);
      const ipMatch = v.ip?.toLowerCase().includes(search);
      const referrerMatch = v.referrer?.toLowerCase().includes(search);
      const refParamMatch = v.refParam?.toLowerCase().includes(search);

      return locationMatch || ispMatch || ipMatch || referrerMatch || refParamMatch;
    }

    return true;
  });

  // Calculate Metrics
  const totalVisits = visitors.length;
  const employerVisits = visitors.filter(v => v.isLikelyEmployer).length;
  const resumeClicks = visitors.filter(v => v.clickedResume).length;
  const messagesSent = visitors.filter(v => v.sentMessage).length;

  // Format Referrer cleanly
  const formatReferrer = (ref, param) => {
    if (param) {
      return (
        <span className="source-tag highlight-param">
          Tag: {param}
        </span>
      );
    }
    if (!ref) return <span className="source-tag direct">Direct / Search</span>;

    try {
      const url = new URL(ref);
      let hostname = url.hostname.replace('www.', '');
      
      if (hostname.includes('linkedin')) {
        return <span className="source-tag linkedin"><FaLinkedin /> LinkedIn</span>;
      }
      if (hostname.includes('github')) {
        return <span className="source-tag github"><FaGithub /> GitHub</span>;
      }
      return <span className="source-tag external">{hostname}</span>;
    } catch {
      return <span className="source-tag external">{ref.substring(0, 20)}...</span>;
    }
  };

  // Helper for Relative Time
  const getRelativeTime = (jsDate) => {
    if (!jsDate) return 'Unknown';
    const now = new Date();
    const diffInSeconds = Math.floor((now - jsDate) / 1000);

    if (diffInSeconds < 5) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return jsDate.toLocaleDateString();
  };

  return (
    <div className="container" style={{ display: 'block', minHeight: '100vh' }}>
      <CursorGradient />
      <Starfield isPlaying={true} isHovering={false} isContactActive={false} />

      {!isAuthenticated ? (
        <div className="secret-container">
          <h2 style={{ marginBottom: '2rem', zIndex: 2 }}>Enter the Secret Password</h2>
          <div className="rainbow-input-wrapper">
            <input
              type="password"
              className="secret-input"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div className="dashboard-container">
          {/* Header & Back Navigation */}
          <div className="dashboard-header-nav">
            <Link to="/" className="back-link-btn">
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <div className="logo-section">
              <h1 className="dashboard-title">Visitor Analytics</h1>
              <p className="dashboard-subtitle">Monitor traffic quality, behavioral intent, and potential employers.</p>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon total-visits">
                <FaUsers />
              </div>
              <div className="metric-info">
                <h3>Total Sessions</h3>
                <p className="metric-number">{totalVisits}</p>
              </div>
            </div>

            <div className="metric-card highlight-employer">
              <div className="metric-icon employers">
                <FaBriefcase />
              </div>
              <div className="metric-info">
                <h3>Likely Employers</h3>
                <p className="metric-number">{employerVisits}</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon resume">
                <FaFileAlt />
              </div>
              <div className="metric-info">
                <h3>Resume Views</h3>
                <p className="metric-number">{resumeClicks}</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon messages">
                <FaEnvelope />
              </div>
              <div className="metric-info">
                <h3>Messages Sent</h3>
                <p className="metric-number">{messagesSent}</p>
              </div>
            </div>
          </div>

          {/* Controls: Filters & Search */}
          <div className="dashboard-controls">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Visits
              </button>
              <button 
                className={`filter-tab ${filter === 'employers' ? 'active' : ''}`}
                onClick={() => setFilter('employers')}
              >
                <FaBriefcase style={{ marginRight: '6px' }} /> Employers
              </button>
              <button 
                className={`filter-tab ${filter === 'real' ? 'active' : ''}`}
                onClick={() => setFilter('real')}
              >
                <FaRobot style={{ marginRight: '6px' }} /> Exclude Bots
              </button>
            </div>

            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search IP, ISP, location, source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="table-responsive-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Visitor / Source</th>
                  <th>Location</th>
                  <th>ISP / Organization</th>
                  <th>Projects Viewed</th>
                  <th>Actions Taken</th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((v) => {
                  const bot = isBotOrCloud(v.isp);
                  return (
                    <tr 
                      key={v.id} 
                      className={`visitor-row ${v.isLikelyEmployer ? 'employer-row' : ''} ${bot ? 'bot-row' : ''}`}
                    >
                      {/* When Column */}
                      <td>
                        <div className="time-cell">
                          <span className="relative-time">{getRelativeTime(v.jsTimestamp)}</span>
                          <span className="absolute-time">{v.time}</span>
                        </div>
                      </td>

                      {/* Visitor Details Column */}
                      <td>
                        <div className="visitor-cell">
                          <div className="visitor-meta">
                            {v.isLikelyEmployer ? (
                              <span className="user-badge employer">Employer</span>
                            ) : bot ? (
                              <span className="user-badge bot">Cloud/Bot</span>
                            ) : (
                              <span className="user-badge general">General</span>
                            )}
                            <span className="device-icon" title={v.device}>
                              {v.device === 'Mobile' ? <FaMobileAlt /> : <FaDesktop />}
                            </span>
                          </div>
                          <div className="visitor-ip">{v.ip}</div>
                          <div className="visitor-referrer">
                            {formatReferrer(v.referrer, v.refParam)}
                          </div>
                        </div>
                      </td>

                      {/* Location Column */}
                      <td>
                        <div className="location-cell">
                          <FaGlobe className="globe-icon" />
                          <span>{v.location}</span>
                        </div>
                      </td>

                      {/* ISP Column */}
                      <td>
                        <span className={`isp-text ${bot ? 'bot-isp' : ''}`}>
                          {v.isp || 'N/A'}
                        </span>
                      </td>

                      {/* Projects Viewed Column */}
                      <td>
                        <div className="viewed-projects-cell">
                          {v.viewedProjects && v.viewedProjects.length > 0 ? (
                            <div className="project-pills">
                              {v.viewedProjects.map((pId) => (
                                <span key={pId} className="project-view-pill" title={`Viewed project: ${pId}`}>
                                  {projectNames[pId] || pId}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="no-projects">None</span>
                          )}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td>
                        <div className="actions-cell">
                          {v.clickedResume && (
                            <span className="action-pill resume" title="Clicked View Resume">
                              <FaFileAlt /> Resume
                            </span>
                          )}
                          {v.sentMessage && (
                            <span className="action-pill message" title="Sent a Contact Message">
                              <FaEnvelope /> Message
                            </span>
                          )}
                          {v.clickedLinkedIn && (
                            <span className="action-pill linkedin" title="Clicked LinkedIn Link">
                              <FaLinkedin /> LinkedIn
                            </span>
                          )}
                          {v.clickedGithub && (
                            <span className="action-pill github" title="Clicked GitHub Link">
                              <FaGithub /> GitHub
                            </span>
                          )}
                          {!v.clickedResume && !v.sentMessage && !v.clickedLinkedIn && !v.clickedGithub && (
                            <span className="action-pill none">No actions</span>
                          )}
                        </div>
                      </td>

                      {/* Map Column */}
                      <td>
                        {v.lat && v.lng ? (
                          <a 
                            href={`https://www.google.com/maps?q=${v.lat},${v.lng}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="map-btn"
                          >
                            Map <FaExternalLinkAlt style={{ fontSize: '0.65rem' }} />
                          </a>
                        ) : (
                          <span className="no-map">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredVisitors.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                      No matching visitors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
