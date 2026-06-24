import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';
import { updateVisitorActivity } from '../utils/analytics';
import './ResumeViewer.css';

function ResumeViewer() {
  // Automatically track resume view when they visit this page
  useEffect(() => {
    updateVisitorActivity({ clickedResume: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ display: 'block', minHeight: '100vh' }}>
      <CursorGradient />
      <Starfield isPlaying={true} isHovering={false} isContactActive={false} />

      <div className="resume-viewer-container">
        {/* Header Bar */}
        <header className="resume-header">
          <div className="resume-title-section">
            <h1 className="resume-main-title">John Cedric Abaloyan</h1>
            <p className="resume-subtitle">Curriculum Vitae / Resume</p>
          </div>

          <div className="resume-actions-group">
            <Link to="/" className="btn-resume-back">
              <FaArrowLeft /> Back to Portfolio
            </Link>
            
            <a 
              href="/resume.pdf" 
              download="John_Cedric_Abaloyan_Resume.pdf" 
              className="btn-resume-download"
            >
              <FaDownload /> Download PDF
            </a>
          </div>
        </header>

        {/* PDF Frame Viewer */}
        <div className="pdf-viewer-wrapper">
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="pdf-iframe"
          >
            <iframe
              src="/resume.pdf"
              title="Resume PDF"
              className="pdf-iframe"
            >
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                This browser does not support inline PDFs. Please use the download button above to view the resume.
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
}

export default ResumeViewer;
