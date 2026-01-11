import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import CursorGradient from './components/CursorGradient';
import Starfield from './components/Starfield';
import './App.css';
import { projects } from './data/projects';

const Archive = () => {
  const [view, setView] = useState('list');

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

  return (
    <div className="container archive-container">

      <Starfield isHovering={isOnTop} />
      <CursorGradient />

      {/* HEADER ROW */}
      <Link to={-1} className="back-link" ref={headerRef}>
        <FaArrowLeft /> John Cedric Abaloyan
      </Link>

      <div className="header-row">
        <h1 className="archive-title">All Projects</h1>

        {/* <div className="view-controls"> */}
        {/*   <button */}
        {/*     className={`view-btn ${view === 'list' ? 'active' : ''}`} */}
        {/*     onClick={() => setView('list')} */}
        {/*     aria-label="List View" */}
        {/*   > */}
        {/*     <FaList /> */}
        {/*   </button> */}
        {/*   <button */}
        {/*     className={`view-btn ${view === 'grid' ? 'active' : ''}`} */}
        {/*     onClick={() => setView('grid')} */}
        {/*     aria-label="Grid View" */}
        {/*   > */}
        {/*     <FaThLarge /> */}
        {/*   </button> */}
        {/* </div> */}
      </div>

      {/* PROJECTS DISPLAY */}
      <div className={`project-display ${view}`}>

        {projects.map((project, index) => (
          <Link to={`/project/${project.id}`}>
            <div key={index} className="archive-card">


              {/* IMAGE */}
              <div className="col-image">
                {(() => {
                  const thumbnail = project.gallery?.find(item => item.type === 'image') || project.gallery?.[0];

                  return (
                    <div className="project-image">
                      {thumbnail ? (
                        thumbnail.type === 'video' ? (
                          <video
                            src={`${thumbnail.url}#t=1`}
                            preload="metadata"
                            muted
                            playsInline
                            loop
                            onMouseOver={event => event.target.play()}
                            onMouseOut={event => { event.target.pause(); event.target.currentTime = 1; }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ) : (
                          <img
                            src={thumbnail.url}
                            alt={project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        )
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                      )}
                    </div>
                  );
                })()}</div>

              {/* TITLE & DESC */}
              <div className="col-info">
                <h3 className="archive-project-title">{project.title}</h3>
                <p className="archive-desc">{project.tagline}</p>
              </div>

              {/* TECH */}
              <div className="col-tech">
                <span className="col-label">Tech Used</span>
                <div className="tech-list">
                  <div className="tags">
                    {project.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    {/* {project.tech.join(', ')} */}
                  </div>
                </div>
              </div>

              {/* LINKS */}
              {/* <div className="col-links"> */}
              {/*   <span className="col-label">Links</span> */}
              {/*   <div className="link-icons"> */}
              {/*     {project.links.repo && project.links.repo !== "#" && (<a href={project.links.repo} target="_blank" rel="noreferrer"><FaGithub size={20} /></a>)} */}
              {/*     {project.links.demo && project.links.demo !== "#" && (<a href={project.links.demo} target="_blank" rel="noreferrer"><FaExternalLinkAlt size={18} /></a>)} */}
              {/*   </div> */}
              {/* </div> */}

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Archive;
