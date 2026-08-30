import { useState, useEffect, useRef, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaFacebookF, FaLastfm } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import CursorGradient from './components/CursorGradient';
import Starfield from './components/Starfield';
import Contact from './components/Contact';
import ProjectThumbnail from './components/ProjectThumbnail';
import ResumeModal from './components/ResumeModal';
import './App.css';
import { projects } from './data/projects';
import { toolCategories } from './data/tools';

function Home() {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const [activeSelection, setActiveSelection] = useState('about');
    const [isContactActive, setIsContactActive] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [songData, setSongData] = useState('null');
    const [audioUrl, setAudioUrl] = useState('null');
    const [audioVolume, setAudioVolume] = useState('null');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Create lookup for tool brand icons and colors
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
        const key = (techName || '').toLowerCase().replace(/[\s\-_.]/g, '');
        if (toolIconMap[key]) return toolIconMap[key];
        if (key.startsWith('html')) return toolIconMap['html5'] || toolIconMap['html'];
        if (key.startsWith('css')) return toolIconMap['css3'] || toolIconMap['css'];
        if (key.includes('alpine')) return toolIconMap['alpinejs'];
        if (key.includes('tailwind')) return toolIconMap['tailwindcss'];
        if (key.includes('mysql')) return toolIconMap['mysql'];
        if (key.includes('postgres')) return toolIconMap['postgresql'];
        if (key.includes('dbeaver')) return toolIconMap['dbeaver'];
        return null;
    };

    const featuredProject = ['moneysense', 'alams', 'trackwise', 'samurai-revenge']
        .map(id => projects.find(p => p.id === id))
        .filter(Boolean);

    const handleToolClick = (toolName) => {
        navigate(`/archive?tech=${encodeURIComponent(toolName)}`);
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sections = ['about', 'experience', 'projects'];

                    for (const sectionId of sections) {
                        const element = document.getElementById(sectionId);

                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top >= 0 && rect.top < 300) {
                                setActiveSelection(prev => (prev !== sectionId ? sectionId : prev));
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            date: "May 2026 - July 2026",
            title: "Database Developer",
            company: "Liberty Investigation and Security Agency Inc.",
            description: "Optimized database architecture by converting Access queries into MySQL Views, restructuring linked tables, and configuring primary keys, auto-increment fields, and relational constraints improving speed to 200%",
            tags: ["MySQL Workbench", "DBeaver", "MS Access"]
        },
        {
            date: "Jan 2026 - April 2026",
            title: "IT Intern",
            company: "Liberty Investigation and Security Agency Inc.",
            description: "Modernized network infrastructure by overhauling network cabling and maintained corporate hardware, including high-level troubleshooting of workstations and the installation of critical hardware components.",
            tags: ["Networking", "Web Development", "Database Admin"]
        },
        {
            date: "2023 — 2026",
            title: "Freelancing",
            company: "",
            description: "Delivered paid project-based work for multiple clients such as 2D games, web systems, and real-estate video edits.",
            tags: ["System Development", "Web Development"]
        },
    ];

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
                    {/* Cute hover / now playing speech bubble */}
                    <div className={`click-me-bubble ${isPlaying ? 'playing' : ''}`}>
                        <span>
                            {isPlaying && songData?.title
                                ? `♫ ${songData.title}`
                                : 'Click me! 🎵'}
                        </span>
                    </div>

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
                </div>

                <div>
                    <h1 className="name">John Cedric<br />Abaloyan</h1>
                    <h2 className="title">IT Student</h2>

                    <button
                        type="button"
                        className="btn-resume"
                        onClick={() => setIsResumeModalOpen(true)}
                    >
                        View Resume
                    </button>

                    <nav>
                        <ul className="nav-list">
                            <li><a href="#about" className={`nav-item ${activeSelection === 'about' ? 'active' : ''}`} onClick={() => setActiveSelection('about')}><span className="nav-line"></span>ABOUT</a></li>
                            <li><a href="#experience" className={`nav-item ${activeSelection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSelection('experience')}><span className="nav-line"></span>EXPERIENCE</a></li>
                            <li><a href="#projects" className={`nav-item ${activeSelection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSelection('projects')}><span className="nav-line"></span>PROJECTS</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="socials" >
                    <a href="https://github.com/Ggwepq" target="_blank" rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/johnabaloyan28/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    <a href="https://www.facebook.com/johnabaloyan28" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                    <a style={{ display: isPlaying ? '' : 'none', transition: "display .3s ease-in-out" }} href="https://last.fm/user/Ggwepq" target="_blank" rel="noreferrer"><FaLastfm /></a>

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
                        Hi👋, I'm Cedric — a <span className="highlight-accent">BS Information Technology graduate</span> and <span className="highlight-accent">software developer</span> who genuinely loves building things. I'm the type who gets more excited the more unfamiliar a project sounds — it usually means I'll learn something new.
                    </p>
                    <p>
                        I've built <span className="highlight-text">Laravel</span> web apps, <span className="highlight-text">Flutter</span> mobile apps, <span className="highlight-text">Unity</span> games, and <span className="highlight-text">machine learning</span>-powered projects — some through freelance work, some through school, and a few just because I was curious if I could. I care a lot about making things that actually work for the people using them, not just things that look good in a demo.
                    </p>
                    <p>
                        When I'm not coding, you'll probably find me editing videos, messing around with 3D animation, reading books and manga, taking long walks to clear my head, or tinkering endlessly with my <a style={{ textDecoration: 'underline' }} className="highlight-accent" href="https://github.com/Ggwepq/dotfiles">setup</a>🏵️ (fedora btw).
                    </p>
                </section>


                <section id="tools" className="tools-section">
                    {toolCategories.map((cat, idx) => (
                        <div key={idx} className="tool-category-group">
                            <h3 className="tool-category-title">
                                <span className="category-emoji">{cat.emoji}</span> {cat.title}
                            </h3>
                            <div className="tool-badges-grid">
                                {cat.items.map((tool, tIdx) => {
                                    const IconComponent = tool.icon;
                                    return (
                                        <button
                                            type="button"
                                            key={tIdx}
                                            className="tool-sticker"
                                            style={{ '--tool-color': tool.color }}
                                            onClick={() => handleToolClick(tool.name)}
                                            aria-label={`View projects using ${tool.name}`}
                                        >
                                            <span className="tool-icon-wrapper" style={{ color: tool.color }}>
                                                <IconComponent />
                                            </span>
                                            <span className="tool-name">{tool.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>

                {/* EXPERIENCE */}
                <section id="experience" style={{ marginBottom: '6rem' }}>
                    <div className="group">
                        {experiences.map((job, index) => (
                            <div key={index} className="card cute-home-card experience-card">
                                <div className="card-date-clean">{job.date}</div>
                                <div className="card-content">
                                    <h3 className="card-title-cute">
                                        {job.title} <span className="card-sparkle">✦</span>
                                    </h3>

                                    {job.company && (
                                        <p className="card-company-cute">
                                            {job.company}
                                        </p>
                                    )}
                                    <p className="card-description-cute">{job.description}</p>
                                    <div className="cute-tags-grid">
                                        {job.tags.map(tag => {
                                            const toolInfo = getToolInfo(tag);
                                            const IconComponent = toolInfo?.icon;
                                            const toolColor = toolInfo?.color || 'var(--accent)';

                                            return (
                                                <span
                                                    key={tag}
                                                    className="cute-tag-pill"
                                                    style={{ '--tool-color': toolColor }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleToolClick(tag);
                                                    }}
                                                    title={`Filter archive by ${tag}`}
                                                >
                                                    {IconComponent && (
                                                        <span className="tag-icon" style={{ color: toolColor }}>
                                                            <IconComponent />
                                                        </span>
                                                    )}
                                                    <span>{tag}</span>
                                                </span>
                                            );
                                        })}
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
                            <Link to={`/project/${project.id}`} key={project.id || index} className="project-card-link">
                                <div className="card cute-home-card project-card">
                                    <div className="project-image cute-project-thumbnail">
                                        <ProjectThumbnail gallery={project.gallery} title={project.title} />
                                    </div>

                                    <div className="card-content">
                                        <div className="card-header-row">
                                            <h3 className="card-title-cute">
                                                <span>{project.title}</span>
                                                <span className="card-arrow-icon">↗</span>
                                            </h3>
                                        </div>

                                        <p className="card-description-cute project-tagline-text">{project.tagline}</p>
                                        
                                        <div className="cute-tags-grid">
                                            {project.tech.map(tag => {
                                                const toolInfo = getToolInfo(tag);
                                                const IconComponent = toolInfo?.icon;
                                                const toolColor = toolInfo?.color || 'var(--accent)';

                                                return (
                                                    <span
                                                        key={tag}
                                                        className="cute-tag-pill"
                                                        style={{ '--tool-color': toolColor }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleToolClick(tag);
                                                        }}
                                                        title={`Filter archive by ${tag}`}
                                                    >
                                                        {IconComponent && (
                                                            <span className="tag-icon" style={{ color: toolColor }}>
                                                                <IconComponent />
                                                            </span>
                                                        )}
                                                        <span>{tag}</span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Link to="/archive" className="cute-view-all-btn">
                        <span>View All Projects</span>
                        <span className="view-all-sparkle">🌸</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
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
            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
            />
        </div>
    );
}

export default Home;
