import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight, FaBriefcase, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import { projects } from '../data/projects';
import { toolCategories } from '../data/tools';
import '../App.css';
import CursorGradient from './CursorGradient';
import Starfield from './Starfield';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

const freelanceIds = ['samurai-revenge', 'alams', 'hand2voice'];

const getProjectCategory = (p) => {
  const tech = (p.tech || []).map(t => t.toLowerCase());
  const roles = (p.role || []).map(r => r.toLowerCase());
  if (tech.includes('unity') || tech.includes('c#') || roles.some(r => r.includes('game'))) return { label: 'Game Development', emoji: '🎮' };
  if (tech.includes('flutter') || tech.includes('dart') || tech.includes('python') || roles.some(r => r.includes('mobile') || r.includes('machine learning'))) return { label: 'Mobile & AI / ML', emoji: '📱' };
  return { label: 'Web Development', emoji: '🌐' };
};

const getSectionEmoji = (heading) => {
  const h = (heading || '').toLowerCase();
  if (h.includes('overview') || h.includes('about')) return '📖';
  if (h.includes('feature') || h.includes('highlight')) return '✨';
  if (h.includes('background') || h.includes('context')) return '💡';
  if (h.includes('role') || h.includes('contribution')) return '🛠️';
  if (h.includes('tech') || h.includes('architecture')) return '⚡';
  if (h.includes('challenge') || h.includes('learning')) return '🎯';
  return '✦';
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');

  const headerRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState("true");

  // Create quick lookup for tool icons & colors
  const toolIconMap = useMemo(() => {
    const map = {};
    toolCategories.forEach(cat => {
      cat.items.forEach(tool => {
        const key = tool.name.toLowerCase().replace(/[\s\-_.]/g, '');
        map[key] = tool;
      });
    });
    return map;
  }, []);

  const getToolInfo = (techName) => {
    const key = techName.toLowerCase().replace(/[\s\-_.]/g, '');
    if (toolIconMap[key]) return toolIconMap[key];
    if (key.startsWith('html')) return toolIconMap['html5'] || toolIconMap['html'];
    if (key.startsWith('css')) return toolIconMap['css3'] || toolIconMap['css'];
    if (key.includes('alpine')) return toolIconMap['alpinejs'];
    if (key.includes('tailwind')) return toolIconMap['tailwindcss'];
    return null;
  };

  // Find previous and next projects
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSlide(0);
  }, [id]);

  // Preload all gallery images for instant, smooth slide transitions
  useEffect(() => {
    if (project?.gallery) {
      project.gallery.forEach((item) => {
        if (item.type === 'image' && item.url) {
          const img = new Image();
          img.src = item.url;
        }
      });
    }
  }, [project]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsOnTop(entry.isIntersecting);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Project not found 🌸</h2>
        <Link to="/archive" className="btn-clear-filter-alt" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to All Projects
        </Link>
      </div>
    );
  }

  const isFreelance = freelanceIds.includes(project.id);
  const categoryInfo = getProjectCategory(project);

  const nextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };
  const goToSlide = (idx) => {
    setSlideDirection(idx > currentSlide ? 'next' : 'prev');
    setCurrentSlide(idx);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/#projects');
    }
  };

  return (
    <div className="container project-detail-container">

      <CursorGradient />
      <Starfield isPlaying={isOnTop} isHovering={!isOnTop} />

      {/* --- TOP HEADER & BREADCRUMBS --- */}
      <div className="detail-header" ref={headerRef}>
        <a href="/#projects" onClick={handleBack} className="cute-back-pill">
          <FaArrowLeft className="back-arrow-icon" /> <span>Back to Projects</span> <span className="back-sparkle">✨</span>
        </a>

        <div className="detail-meta-chips">
          <span className="meta-chip category">
            <span>{categoryInfo.emoji}</span> {categoryInfo.label}
          </span>
          {isFreelance && (
            <span className="meta-chip freelance">
              <FaBriefcase /> Freelance
            </span>
          )}
          {project.year && (
            <span className="meta-chip year">
              <FaCalendarAlt /> {project.year}
            </span>
          )}
        </div>
      </div>

      {/* --- HERO MEDIA CAROUSEL --- */}
      <div className="carousel-wrapper cute-carousel">
        {project.gallery.length > 1 && (
          <div className="carousel-badge">
            <span>📷 {currentSlide + 1} / {project.gallery.length}</span>
          </div>
        )}

        <div key={currentSlide} className={`carousel-content slide-${slideDirection}`}>
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
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
          ) : (
            <img 
              src={project.gallery[currentSlide].url} 
              alt={`${project.title} slide ${currentSlide + 1}`} 
              className="carousel-media" 
              loading="eager"
            />
          )}
        </div>

        {project.gallery.length > 1 && (
          <>
            <button className="carousel-btn prev cute-carousel-btn" onClick={prevSlide} aria-label="Previous slide">
              <FaChevronLeft />
            </button>
            <button className="carousel-btn next cute-carousel-btn" onClick={nextSlide} aria-label="Next slide">
              <FaChevronRight />
            </button>
            <div className="carousel-dots cute-dots">
              {project.gallery.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentSlide ? 'active' : ''}`} 
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- DETAIL CONTENT GRID --- */}
      <div className="detail-content">

        {/* LEFT COLUMN */}
        <div className="detail-left">
          <div className="project-title-box">
            <h1 className="project-title-large">
              {project.title} <span className="title-sparkle">🌸</span>
            </h1>
            <p className="project-tagline cute-tagline-box">{project.tagline}</p>
          </div>

          <div className="project-sections">
            {project.sections.map((section, index) => (
              <div key={index} className="detail-section cute-section-card">
                <h3 className="section-heading">
                  <span className="heading-emoji">{getSectionEmoji(section.heading)}</span> {section.heading}
                </h3>
                {section.type === 'list' ? (
                  <ul className="cute-feature-list">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <span className="list-bullet">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="section-text">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN SIDEBAR */}
        <div className="detail-right">

          {/* ACTION LINKS */}
          {(project.links.demo || project.links.repo) && (
            <div className="info-box cute-info-card">
              <span className="col-label"><span className="label-emoji">🚀</span> Quick Links</span>
              <div className="project-links-col">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="cute-action-btn demo-btn">
                    <span>✨ {project.demoButton || 'Live Demo'}</span>
                    <FaExternalLinkAlt className="action-icon" />
                  </a>
                )}
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noreferrer" className="cute-action-btn repo-btn">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <FaGithub /> Source Code
                    </span>
                    <FaExternalLinkAlt className="action-icon" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* TECHNOLOGIES */}
          <div className="info-box cute-info-card">
            <span className="col-label"><span className="label-emoji">🧰</span> Tech Stack</span>
            <div className="tech-stickers-grid">
              {project.tech.map((t, idx) => {
                const toolInfo = getToolInfo(t);
                const IconComponent = toolInfo?.icon;
                const toolColor = toolInfo?.color || 'var(--accent)';

                return (
                  <Link
                    to={`/archive?tech=${encodeURIComponent(t)}`}
                    key={idx}
                    className="tool-sticker detail-sticker"
                    style={{ '--tool-color': toolColor }}
                    title={`Browse all ${t} projects`}
                  >
                    {IconComponent && (
                      <span className="tool-icon-wrapper" style={{ color: toolColor }}>
                        <IconComponent />
                      </span>
                    )}
                    <span className="tool-name">{t}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ROLES & SCOPE */}
          {project.role && project.role.length > 0 && (
            <div className="info-box cute-info-card">
              <span className="col-label"><span className="label-emoji">👤</span> My Role</span>
              <div className="role-pills-wrap">
                {project.role.map((r, idx) => (
                  <span key={idx} className="cute-role-badge">
                    <span className="role-dot">●</span> {r}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* --- BOTTOM PROJECT NAVIGATION BAR --- */}
      <div className="project-bottom-nav">
        <Link to={`/project/${prevProject.id}`} className="nav-project-card prev">
          <span className="nav-direction">← Previous Project</span>
          <span className="nav-project-name">{prevProject.title}</span>
        </Link>

        <Link to="/archive" className="nav-all-projects-btn">
          <span>🌸 All Projects</span>
        </Link>

        <Link to={`/project/${nextProject.id}`} className="nav-project-card next">
          <span className="nav-direction">Next Project →</span>
          <span className="nav-project-name">{nextProject.title}</span>
        </Link>
      </div>

    </div>
  );
};

export default ProjectDetail;

