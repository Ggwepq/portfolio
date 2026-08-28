import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaCode, FaHeadset, FaExternalLinkAlt } from 'react-icons/fa';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';
import { resumes, getResumeEmbedUrl, getResumeDownloadUrl } from '../data/resumes';
import './ResumeViewer.css';

function ResumeViewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedRole = searchParams.get('role');

  // Find matching resume or default to first
  const initialResume = resumes.find(r => r.id === requestedRole) || resumes[0];
  const [selectedId, setSelectedId] = useState(initialResume.id);

  // Sync if URL search param changes
  useEffect(() => {
    if (requestedRole && resumes.some(r => r.id === requestedRole)) {
      setSelectedId(requestedRole);
    }
  }, [requestedRole]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedId]);

  const activeResume = resumes.find(r => r.id === selectedId) || resumes[0];
  const embedUrl = getResumeEmbedUrl(activeResume.url);
  const downloadUrl = getResumeDownloadUrl(activeResume.url);
  const isGoogleEmbed = embedUrl.includes('google.com');

  const handleTabChange = (id) => {
    setSelectedId(id);
    setSearchParams({ role: id });
  };

  const getTabIcon = (id) => {
    switch (id) {
      case 'it-support':
        return <FaHeadset />;
      case 'developer':
      default:
        return <FaCode />;
    }
  };

  return (
    <div className="container" style={{ display: 'block', minHeight: '100vh' }}>
      <CursorGradient />
      <Starfield isPlaying={true} isHovering={false} isContactActive={false} />

      <div className="resume-viewer-container">
        {/* Header Bar */}
        <header className="resume-header">
          <div className="resume-title-section">
            <h1 className="resume-main-title">
              John Cedric Abaloyan <span className="resume-title-sparkle">🌸</span>
            </h1>
            <p className="resume-subtitle">{activeResume.role}</p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="resume-tabs-wrapper">
            {resumes.map((resume) => (
              <button
                key={resume.id}
                type="button"
                className={`resume-tab-btn ${selectedId === resume.id ? 'active' : ''}`}
                onClick={() => handleTabChange(resume.id)}
              >
                {getTabIcon(resume.id)}
                <span>{resume.id === 'developer' ? 'Developer' : 'IT Support'}</span>
              </button>
            ))}
          </div>

          <div className="resume-actions-group">
            <Link to="/" className="btn-resume-back">
              <FaArrowLeft /> Back to Portfolio ✨
            </Link>

            <a 
              href={activeResume.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-resume-drive"
              title="Open full document in Google Drive"
            >
              <FaExternalLinkAlt /> Open in Drive ↗
            </a>

            <a 
              href={downloadUrl} 
              download={activeResume.downloadFilename || `${activeResume.id}-resume.pdf`} 
              className="btn-resume-download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload /> Download PDF
            </a>
          </div>
        </header>

        {/* Frame Viewer */}
        <div className="pdf-viewer-wrapper">
          {isGoogleEmbed ? (
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={`${activeResume.title} Preview`}
              className="pdf-iframe"
              allow="autoplay"
            />
          ) : (
            <object
              key={embedUrl}
              data={embedUrl}
              type="application/pdf"
              className="pdf-iframe"
            >
              <iframe
                src={embedUrl}
                title={`${activeResume.title} PDF`}
                className="pdf-iframe"
              >
                <div className="pdf-fallback-container">
                  <p>This browser does not support inline PDF previewing.</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a 
                      href={activeResume.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-resume-drive"
                    >
                      <FaExternalLinkAlt /> Open in Google Drive ↗
                    </a>
                    <a 
                      href={downloadUrl} 
                      download={activeResume.downloadFilename}
                      className="btn-resume-download"
                    >
                      <FaDownload /> Download PDF
                    </a>
                  </div>
                </div>
              </iframe>
            </object>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeViewer;

