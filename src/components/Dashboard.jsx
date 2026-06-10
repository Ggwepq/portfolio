import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';
import '../Dashboard.css';

function Dashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      if (isAuthenticated && db) {
        try {
          const q = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            time: doc.data().timestamp ? doc.data().timestamp.toDate().toLocaleString() : 'Unknown time'
          }));
          setVisitors(data);
        } catch (error) {
          console.error("Error fetching visitors: ", error);
        }
      }
    };
    fetchVisitors();
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

  return (
    <div className="container" style={{ display: 'block' }}>
      <CursorGradient />
      {/* Force the starfield to always play/show */}
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
          <h1 className="archive-title">Visitor Analytics</h1>
          <p style={{ marginTop: '10px' }}>Tracking who views the portfolio.</p>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Location</th>
                <th>ISP / Org</th>
                <th>Device</th>
                <th>Map</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.id}>
                  <td>{v.time}</td>
                  <td>{v.location} <br/><span style={{fontSize: '0.8rem', color: '#94a3b8'}}>{v.ip}</span></td>
                  <td>{v.isp || 'N/A'}</td>
                  <td>{v.device}</td>
                  <td>
                    {v.lat && v.lng ? (
                      <a 
                        href={`https://www.google.com/maps?q=${v.lat},${v.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                      >
                        View Map
                      </a>
                    ) : (
                      <span style={{ color: '#64748b' }}>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {visitors.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No visitors tracked yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
