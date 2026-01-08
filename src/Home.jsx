import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CursorGradient from './components/CursorGradient';
import './App.css';

function Home() {
  const audioRef = useRef(null);
  const [activeSelection, setActiveSelection] = useState('about');
  const [songData, setSongData] = useState('null');
  const [audioUrl, setAudioUrl] = useState('null');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects'];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);

        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveSelection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  });

  useEffect(() => {
    const fetchMusic = async () => {
      const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
      const USER = import.meta.env.VITE_LASTFM_USERNAME;

      try {
        const lastFmRes = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`
        );
        const lastFmJson = await lastFmRes.json();
        const track = lastFmJson.recenttracks.track[0];

        const artist = track.artist['#text'];
        const title = track.name;

        setSongData({ artist, title });

        const searchTerm = encodeURIComponent(`${title} ${artist}`);
        const itunesRes = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`
        );
        const itunesJson = await itunesRes.json();

        if (itunesJson.results.length > 0) {
          setAudioUrl(itunesJson.results[0].previewUrl);
        }

      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    fetchMusic();
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (audioRef.current && audioUrl) {
      if (!isPlaying) {

        audioRef.current.volume = 0.1;
      }
      audioRef.current.play().catch(e => console.log("Play blocked", e));
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };


  const experiences = [
    {
      date: "2023 — PRESENT",
      title: "Freelancing",
      company: "",
      description: "Built multiple projects for multiple clients such as a 2D Game, mobile app for sign language translation ,  and a gym management system.",
      tags: []
    },
  ];

  const projects = [
    {
      image: "https://via.placeholder.com/150",
      title: "TrackWise",
      description: "A personal expense tracking system that helps manage and tracks expense, budget, and savings made with Laravel, Livewire, and PostgreSQL.",
      tags: ["Laravel", "Livewire", "TailwindCSS", "AlpineJS", "PostgreSQL", "Vercel", "Supabase"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Barangay Information System",
      description: "A Barangay Information System made for the residents of Barangay 73 Caloocan to reduce manual errors and improve queueing time made with Laravel, Boostrap, and MySQL.",
      tags: ["Laravel", "Bootstrap", "MySQL"]
    },
    {
      image: "",
      title: "Watchlist API & UI",
      description: "An API for managing movie playlists and a UI for streaming movies from those playlists made with Laravel, TailwindCSS, MySQL, TMDB API, and Embed.su API",
      tags: ["Laravel", "TailwindCSS", "MySQL", "TMDB API"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "MoneySense",
      description: "A voice-guided mobile application for identifying and verifying Philippine denominations for visually-impaired Filipinos made with Flutter, and YOLOv8.",
      tags: ["Flutter", "Dart", "Python"]
    },

  ];

  return (
    <div className="container">

      <CursorGradient />

      {/* --- LEFT SIDE  --- */}
      <header className="left-section">


        <div
          className={`profile-img-wrapper ${isPlaying ? 'playing' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleAudio}
        >
          <img src="/cedjuani.jpg" alt="Profile" className="profile-img default" />
          <img src="/cedjuani-singing.png" alt="Singing" className="profile-img hover-img" />

          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
            />
          )}

          {songData && isPlaying && (
            <div className="music-badge">
              <span>♫ {songData.title}</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="name">John Cedric Abaloyan</h1>
          <h2 className="title">IT Student</h2>

          <a href="https://tinyurl.com/mpwzt545" target="_blank" rel="noopener noreferrer" className="btn-resume">
            View Resume
          </a>

          <nav>
            <ul className="nav-list">
              <li><a href="#about" className={`nav-item ${activeSelection === 'about' ? 'active' : ''}`} onClick={() => setActiveSelection('about')}><span className="nav-line"></span>ABOUT</a></li>
              <li><a href="#experience" className={`nav-item ${activeSelection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSelection('experience')}><span className="nav-line"></span>EXPERIENCE</a></li>
              <li><a href="#projects" className={`nav-item ${activeSelection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSelection('projects')}><span className="nav-line"></span>PROJECTS</a></li>
            </ul>
          </nav>
        </div>

        <div className="socials" >
          <a href="https://github.com/Ggwepq" target="_blank"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/johnabaloyan28/" target="_blank"><FaLinkedin /></a>
          <a href="https://www.facebook.com/johnabaloyan28" target="_blank"><FaFacebookF /></a>

          <a href="mailto:ggwepq@example.com" className="btn-contact">
            Contact Me
          </a>
        </div>
      </header>

      {/* --- RIGHT SIDE --- */}
      <main className="right-section">

        {/* ABOUT */}
        <section id="about" style={{ marginBottom: '6rem' }}>
          <p>
            I am a 4th year BSIT student with a passion for creating unique and aesthethic applications. I have a wide range of Projects from Game Development, Full stack web development, Mobile Application development, and now Machine Learning.

          </p>
          <p>
            In the past, I tried freelancing which allowed me to enhance my skills and satisfy my clients' needs. I worked in projects such as a 2D Platformer Game that showcases Player Movements, Combat, Level Design and Game Juices. A mobile application that translates sign language from deaf to non-deaf users. A Gym Management System that showcases forecasting and recommendation based on fitness trends and gym's sales.

          </p>
          <p>
            In my spare time, i'm usually reading books or manga, absorbing self-help contents, going for a jog, and customizing my setup.
          </p>
        </section>


        <section id="tools" style={{ marginBottom: '6rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Programming Languages</h3>
          <p style={{ marginBottom: '2rem' }}>PHP, Java, HTML, CSS, Javascript, Python, Flutter, Dart, C#</p>

          <h3 style={{ marginBottom: '1rem' }}>Frameworks</h3>
          <p style={{ marginBottom: '2rem' }}>Laravel, Livewire, AlpineJS, Tailwind CSS, CodeIgniter, Flutter, Bootstrap</p>

          <h3 style={{ marginBottom: '1rem' }}>Tools Used</h3>
          <p style={{ marginBottom: '2rem' }}>Git, GitHub, Neovim, Figma, Jira, Vercel, Supabase, Linux, Powershell, Unity</p>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ marginBottom: '6rem' }}>
          <div className="group">
            {experiences.map((job, index) => (
              <div key={index} className="card">
                <div className="card-date">{job.date}</div>
                <div className="card-content">
                  <h3>{job.title} {job.company !== '' ? '·' : ''} {job.company}</h3>
                  <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>{job.description}</p>
                  <div className="tags">
                    {job.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <a href="#" style={{ display: 'inline-block', marginTop: '20px', fontWeight: 'bold' }}>View Full Resume ↗</a> */}
        </section>


        {/* PROJECTS */}
        <section id="projects" style={{ marginBottom: '6rem' }}>
          <div className="group">
            {projects.map((project, index) => (
              <div key={index} className="card">
                {/* <div className="card-date"> */}
                {/*   <img */}
                {/*     src={project.image} */}
                {/*     alt="Project Thumbnail" */}
                {/*     style={{ width: '120px', borderRadius: '4px', border: '1px solid #334155' }} */}
                {/*   /> */}
                {/* </div> */}
                <div className="project-image" ></div>
                <div className="card-content">
                  <h3 className='view-all-link'> <span>{project.title}</span> <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#e3e3e3"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" /></svg></h3>
                  <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>{project.description}</p>
                  <div className="tags">
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/archive" className="view-all-link">
            <span>View All Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              className="arrow-icon"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </Link>

        </section>

        {/* <footer style={{ fontSize: '0.8rem', color: '#64748b' }}> */}
        {/*   <p> */}
        {/*     Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with React and CSS, deployed with Vercel. */}
        {/*   </p> */}
        {/* </footer> */}

      </main>
    </div >
  );
}

export default Home;
