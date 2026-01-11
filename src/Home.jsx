import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebookF, FaLastfm } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CursorGradient from './components/CursorGradient';
import Starfield from './components/Starfield';
import Contact from './components/Contact';
import ProjectThumbnail from './components/ProjectThumbnail';
import './App.css';
import { projects } from './data/projects';

function Home() {
  const audioRef = useRef(null);
  const [activeSelection, setActiveSelection] = useState('about');
  const [isContactActive, setIsContactActive] = useState(false);
  const [songData, setSongData] = useState('null');
  const [audioUrl, setAudioUrl] = useState('null');
  const [audioVolume, setAudioVolume] = useState('null');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const featuredProject = projects.filter(p => ['trackwise', 'bis', 'preplus', 'moneysense'].includes(p.id));

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactActive(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

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
        const link = track.url;

        setSongData({ artist, title, link });


        const searchTerm = encodeURIComponent(`${artist} ${title}`);
        console.log(searchTerm);
        const itunesRes = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`
        );
        const itunesJson = await itunesRes.json();

        console.log(itunesJson);

        if (itunesJson.results.length > 0) {
          setAudioUrl(itunesJson.results[0].previewUrl);
        }

        console.log(audioUrl);

      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    fetchMusic();
  }, []);

  const fadeIn = (audio, targetVolume = 0.3, duration = 500) => {
    audio.volume = audioVolume;
    const steps = 20;
    const increment = targetVolume / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audio.volume = targetVolume;
        return;
      }
      audio.volume = Math.min(audio.volume + increment, targetVolume);
      currentStep++;
    }, stepDuration);

    return fadeInterval;
  };

  const fadeOut = (audio, duration = 300) => {
    const startVolume = audio.volume;
    const steps = 20;
    const decrement = startVolume / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audio.pause();
        audio.volume = 0;
        return;
      }
      audio.volume = Math.max(audio.volume - decrement, 0);
      currentStep++;
    }, stepDuration);

    return fadeInterval;
  };

  const toggleAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      setAudioVolume(0)
      fadeOut(audioRef.current, 300)
      setIsPlaying(false);
    } else {
      setAudioVolume(0.3)
      audioRef.current.play();
      fadeIn(audioRef.current, 0.3, 300)
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (audioRef.current && audioUrl) {
      if (!isPlaying) {
        setAudioVolume(0.15);
        fadeIn(audioRef.current, 0.15, 400);
      }
      audioRef.current.play().catch(e => console.log("Play blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isPlaying) return;
    if (audioRef.current) {
      setAudioVolume(0);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAudioEnded = () => {
    // fadeOut(audioRef.current, 300)
    // setIsPlaying(false);
    // fadeOut(audioRef.current, 300)
    replayAudio();
  };

  const replayAudio = () => {
    audioRef.current.pause();
    audioRef.current.time = 0;
    audioRef.current.play();
    setAudioVolume(0.3)
    fadeIn(audioRef.current, 0.3, 300)
    setIsPlaying(true);
  }


  const experiences = [
    {
      date: "2023 — PRESENT",
      title: "Freelancing",
      company: "",
      description: "Delivered paid project-based work for multiple clients such as 2D games, web systems, and real-estate video edits.",
      tags: ["Web Development", "Game Development", "Video Editing"]
    },
  ];

  // const projects = [
  //   {
  //     image: "https://via.placeholder.com/150",
  //     title: "TrackWise",
  //     description: "A personal expense tracking system that helps manage and tracks expense, budget, and savings made with Laravel, Livewire, and PostgreSQL.",
  //     tags: ["Laravel", "Livewire", "TailwindCSS", "AlpineJS", "PostgreSQL", "Vercel", "Supabase"]
  //   },
  //   {
  //     image: "https://via.placeholder.com/150",
  //     title: "Barangay Information System",
  //     description: "A Barangay Information System made for the residents of Barangay 73 Caloocan to reduce manual errors and improve queueing time made with Laravel, Boostrap, and MySQL.",
  //     tags: ["Laravel", "Bootstrap", "MySQL"]
  //   },
  //   {
  //     image: "",
  //     title: "Watchlist API & UI",
  //     description: "An API for managing movie playlists and a UI for streaming movies from those playlists made with Laravel, TailwindCSS, MySQL, TMDB API, and Embed.su API",
  //     tags: ["Laravel", "TailwindCSS", "MySQL", "TMDB API"]
  //   },
  //   {
  //     image: "https://via.placeholder.com/150",
  //     title: "MoneySense",
  //     description: "A voice-guided mobile application for identifying and verifying Philippine denominations for visually-impaired Filipinos made with Flutter, and YOLOv8.",
  //     tags: ["Flutter", "Dart", "Python"]
  //   },
  //
  // ];

  return (
    <div className="container">

      <CursorGradient />

      <Starfield isPlaying={isPlaying} isHovering={isHovering} isContactActive={isContactActive} />

      {/* --- LEFT SIDE  --- */}
      <header className="left-section">


        <div
          className={`profile-img-wrapper ${isPlaying ? 'playing' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleAudio}
        >
          <div className="profile-img-container">

            <img src="/cedjuani.jpg" alt="Profile" className="profile-img default" />
            <img src="/cedjuani-singing.png" alt="Singing" className="profile-img hover-img" />
          </div>

          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
            />
          )}

          {songData && isPlaying && (
            <div className="music-badge">
              <a href={songData.link}>
                <span>
                  Last played - ♫ {songData.title}</span></a>
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
          <a style={{ display: isPlaying ? '' : 'none', transition: "display .3s ease-in-out" }} href="https://last.fm/user/Ggwepq" target="_blank"><FaLastfm /></a>

          <a href="#contact" className="btn-contact">
            Get in Touch
          </a>
        </div>
      </header>

      {/* --- RIGHT SIDE --- */}
      <main className={`right-section ${isContactActive ? 'focus-mode' : ''}`}>

        {/* ABOUT */}
        <section id="about" style={{ marginBottom: '6rem' }}>
          <p>
            I am a 4th year BSIT student from Caloocan and have worked on projects from Web Development to Game Development. I am currently focusing on Mobile Development and Machine Learning specifically Computer Vision due to our Capstone Project. My goal is to explore the world of software development by challenging myself on making projects i've never done before.
          </p>
          <p>
            In the past, I've tried freelancing which allowed me to enhance my skills and satisfy my clients' needs. I worked on projects such as a 2D Platformer Game that showcases Player Movements, Combat, Level Design and Game Juices. A mobile application that translates sign language from deaf to non-deaf users. A Gym Management System that showcases forecasting and recommendation based on fitness trends and gym's sales.
          </p>
          <p>
            Aside from programming, i also edit videos, make 3D animations, read books/manga, go for a walk, and customize my setup.
          </p>
        </section>


        <section id="tools" style={{ marginBottom: '6rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Programming Languages</h3>
          <p style={{ marginBottom: '2rem' }}>PHP, HTML, CSS, Javascript, Python, Flutter, Dart, C#</p>

          <h3 style={{ marginBottom: '1rem' }}>Frameworks</h3>
          <p style={{ marginBottom: '2rem' }}>Laravel, Livewire, AlpineJS, Tailwind CSS, CodeIgniter, Flutter, Bootstrap</p>

          <h3 style={{ marginBottom: '1rem' }}>Tools Used</h3>
          <p style={{ marginBottom: '2rem' }}>Git, GitHub, Figma, Jira, Vercel, Supabase, Arch Linux, Powershell, Unity</p>
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
            {featuredProject.map((project, index) => (
              <Link to={`/project/${project.id}`}>
                <div key={index} className="card">
                  <div className="project-image">
                    <ProjectThumbnail gallery={project.gallery} title={project.title} />
                  </div>

                  <div className="card-content">
                    <h3 className='view-all-link'> {project.title}</h3>
                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8' }}>{project.tagline}</p>
                    <div className="tags">
                      {project.tech.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Link>
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

        <Contact />

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
