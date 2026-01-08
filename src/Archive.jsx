import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaList, FaThLarge, FaArrowLeft } from 'react-icons/fa';
import CursorGradient from './components/CursorGradient';
import './App.css';

const Archive = () => {
  const [view, setView] = useState('list');

  const projects = [
    {
      title: "TrackWise",
      description: "A personal expense tracking system that helps manage and track expenses, budgets, and savings.",
      tech: ["Laravel", "Livewire", "AlpineJS", "TailwindCSS", "PostgreSQL", "Vercel", "Supabase"],
      link: "#",
      github: "#"
    },
    {
      title: "Barangay Information System",
      description: "A system made for the residents of Barangay 73 Caloocan to reduce manual errors and improve queueing time.",
      tech: ["Laravel", "Bootstrap", "MySQL"],
      link: "#",
      github: "#"
    },
    {
      title: "BrewsNBites",
      description: "An e-commerce platform about coffee, drinks, snacks, and foods.",
      tech: ["Laravel", "VueJS", "Tailwind CSS", "MySQL"],
      link: "#",
      github: "#"
    },
    {
      title: "Caveman Poetry",
      description: "A game inspired by Poetry for Neanderthals",
      tech: ["HTML", "CSS", "Javascript"],
      link: "#",
      github: "#"
    },
    {
      title: "Preplus GMS",
      description: "A Gym Management System with member management, inventory management, forecast and recommendation based on trends and gym's sales.",
      tech: ["PHP", "HTML", "CSS", "Javascript", "MySQL"],
      link: "#",
      github: "#"
    },
    {
      title: "Watchlist API & UI",
      description: "An API with UI for managing movie watchlists and streaming movies from those watchlists",
      tech: ["Laravel", "Tailwind CSS", "MySQL", "TMDB API"],
      link: "#",
      github: "#"
    },
    {
      title: "FlixToChill",
      description: "Very simple movie streaming website.",
      tech: ["PHP", "HTML", "CSS", "TMDB API"],
      link: "#",
      github: "#"
    },
    {
      title: "MoneySense",
      description: "A voice-guided mobile application for identifying and verifying Philippine Peso for visually-impaired users.",
      tech: ["Flutter", "Dart", "Python"],
      link: "#",
      github: "#"
    },
    {
      title: "Hand2Voice",
      description: "A mobile application that translates filipino sign language to text.",
      tech: ["Flutter", "Dart", "Python"],
      link: "#",
      github: "#"
    },
    {
      title: "Samurai's Revenge",
      description: "2D Platformer Game with combat and intelligent Enemies.",
      tech: ["Unity", "C#"],
      link: "#",
      github: "#"
    },
    {
      title: "King's Knight",
      description: "2D Platformer Game with basic movements and good level design.",
      tech: ["Unity", "C#"],
      link: "#",
      github: "#"
    },
    {
      title: "Forest Escape",
      description: "Simple 2D platformer game with good movements, vfx, sfx, and game juices",
      tech: ["Unity", "C#"],
      link: "https://drive.google.com/file/d/16IpOigbWLx5NeVTNuCncRE63T8vItPlk/view?usp=drive_link",
      github: "#"
    },
    {
      title: "Java Tetris",
      description: "A simple tetris game made in Java.",
      tech: ["Java"],
      link: "#",
      github: "#"
    },
    {
      title: "One Piece Website",
      description: "Cool website about one piece.",
      tech: ["HTML", "CSS"],
      link: "#",
      github: "#"
    },
  ];

  return (
    <div className="container archive-container">

      <CursorGradient />

      {/* HEADER ROW */}
      <Link to="/" className="back-link">
        <FaArrowLeft /> John Cedric Abaloyan
      </Link>

      <div className="header-row">
        <h1 className="archive-title">All Projects</h1>

        <div className="view-controls">
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
            aria-label="List View"
          >
            <FaList />
          </button>
          <button
            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid View"
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* PROJECTS DISPLAY */}
      <div className={`project-display ${view}`}>

        {projects.map((project, index) => (
          <div key={index} className="archive-card">

            {/* COL 1: IMAGE (Placeholder) */}
            <div className="col-image">
              <div style={{ width: '120px', height: '80px', background: 'rgba(255,255,255,0.1)', flexShrink: 0, borderRadius: '5px' }}></div>
            </div>

            {/* COL 2: TITLE & DESC */}
            <div className="col-info">
              <h3 className="archive-project-title">{project.title}</h3>
              <p className="archive-desc">{project.description}</p>
            </div>

            {/* COL 3: TECH */}
            <div className="col-tech">
              <span className="col-label">Tech Used</span>
              <div className="tech-list">
                <div className="tags">
                  {project.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  {/* {project.tech.join(', ')} */}
                </div>
              </div>
            </div>

            {/* COL 4: LINKS */}
            <div className="col-links">
              <span className="col-label">Links</span>
              <div className="link-icons">
                <a href={project.github} target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
                <a href={project.link} target="_blank" rel="noreferrer"><FaExternalLinkAlt size={18} /></a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
