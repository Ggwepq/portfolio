import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects } from '../data/projects';
import '../App.css';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [currentSlide, setCurrentSlide] = useState(0);

  const headerRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState("true");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsOnTop(entry.isIntersecting);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hoverMedia = () => {
    setIsOnTop(!isOnTop);
  }

  if (!project) return <div className="container"><h2>Project not found</h2></div>;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };
  return (
    <div className="container project-detail-container">

      <CursorGradient />
      <Starfield isPlaying={isOnTop} isHovering={!isOnTop} />


      <div className="detail-header" ref={headerRef}>
        <Link to={-1} className="back-link">
          <FaArrowLeft /> Back to Projects
        </Link>
      </div>

      <div className="carousel-wrapper" >
        <div className="carousel-content" >
          {project.gallery[currentSlide].type === 'video' ? (

            <div style={{ width: '100%', height: '100%' }}>
              <MediaPlayer
                src={project.gallery[currentSlide].url}
                viewType="video"
                streamType="on-demand"
                logLevel="warn"
                crossOrigin
                playsInline
                title={project.title}
                aspectRatio="16/9"
              >
                <MediaProvider>
                </MediaProvider>

                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>

          ) : (
            <img src={project.gallery[currentSlide].url} alt="Project Screenshot" className="carousel-media" />
          )}
        </div>

        {project.gallery.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={prevSlide}><FaChevronLeft /></button>
            <button className="carousel-btn next" onClick={nextSlide}><FaChevronRight /></button>
            <div className="carousel-dots">
              {project.gallery.map((_, idx) => (
                <span key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="detail-content">

        <div className="detail-left">
          <h1 className="project-title-large">{project.title}</h1>
          <p className="project-tagline">{project.tagline}</p>

          <div className="project-sections">
            {project.sections.map((section, index) => (
              <div key={index} className="detail-section">
                <h3 className="section-heading">{section.heading}</h3>
                {section.type === 'list' ? (
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#94a3b8' }}>
                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                ) : (
                  <p className="section-text">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="detail-right">

          <div className="info-box">
            <span className="col-label">Links</span>
            <div className="project-links-col">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="link-btn">
                  <FaExternalLinkAlt /> {project.demoButton}
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer" className="link-btn">
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
          </div>

          <div className="info-box">
            <span className="col-label">Technologies</span>
            <div className="tech-tags-large">
              {project.tech.map(t => <span key={t} className="pill large">{t}</span>)}
            </div>
          </div>


          <div className="info-box">
            <span className="col-label">Role/Type</span>
            <div className="tech-tags-large">
              {project.role.map(t => <span key={t} className="pill large">{t}</span>)}
            </div>
          </div>


          {/* <div className="info-box"> */}
          {/*   <span className="col-label">Year</span> */}
          {/*   <p style={{ color: '#94a3b8' }}>{project.year}</p> */}
          {/* </div> */}

        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
