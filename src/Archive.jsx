import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronDown, FaBriefcase } from 'react-icons/fa';
import CursorGradient from './components/CursorGradient';
import Starfield from './components/Starfield';
import ProjectThumbnail from './components/ProjectThumbnail';
import './App.css';
import { projects } from './data/projects';
import { toolCategories } from './data/tools';

const categoryFilters = [
    { id: 'web', label: 'Web Development', emoji: '🌐' },
    { id: 'mobile', label: 'Mobile & AI / ML', emoji: '📱' },
    { id: 'game', label: 'Game Development', emoji: '🎮' },
];

const freelanceIds = ['samurai-revenge', 'alams', 'hand2voice'];

const matchesTech = (techArr, target) => {
    if (!target || !techArr) return false;
    const cleanTarget = target.toLowerCase().replace(/[\s\-_.]/g, '');
    return techArr.some(t => {
        const cleanT = t.toLowerCase().replace(/[\s\-_.]/g, '');
        if (cleanT === cleanTarget) return true;
        if (cleanTarget.startsWith('html') && cleanT.startsWith('html')) return true;
        if (cleanTarget.startsWith('css') && cleanT.startsWith('css')) return true;
        if (cleanTarget.includes('alpine') && cleanT.includes('alpine')) return true;
        if (cleanTarget.includes('tailwind') && cleanT.includes('tailwind')) return true;
        if (cleanTarget.includes('fedora') && cleanT.includes('linux')) return true;
        if (cleanTarget.includes('linux') && cleanT.includes('linux')) return true;
        if (cleanTarget.includes('powershell') && cleanT.includes('powershell')) return true;
        if (cleanTarget === 'c#' && cleanT === 'c#') return true;
        return cleanT.includes(cleanTarget) || cleanTarget.includes(cleanT);
    });
};

const getProjectCategory = (p) => {
    const tech = (p.tech || []).map(t => t.toLowerCase());
    const roles = (p.role || []).map(r => r.toLowerCase());
    if (tech.includes('unity') || tech.includes('c#') || roles.some(r => r.includes('game'))) return 'game';
    if (tech.includes('flutter') || tech.includes('dart') || tech.includes('python') || roles.some(r => r.includes('mobile') || r.includes('machine learning'))) return 'mobile';
    return 'web';
};

const Archive = () => {
    const [view, setView] = useState('list');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategory = searchParams.get('category') || '';
    const activeTech = searchParams.get('tech') || '';
    const isFreelance = searchParams.get('freelance') === 'true';

    // Collapse by default; auto-expand if arriving with a tech or freelance query parameter
    const [isLanguagesOpen, setIsLanguagesOpen] = useState(Boolean(activeTech || isFreelance));

    const headerRef = useRef(null);
    const [isOnTop, setIsOnTop] = useState("true");

    // Flatten tool items for quick tech filters
    const allTools = useMemo(() => {
        const list = [];
        toolCategories.forEach(cat => {
            cat.items.forEach(item => {
                if (!list.some(existing => existing.name.toLowerCase() === item.name.toLowerCase())) {
                    list.push(item);
                }
            });
        });
        return list;
    }, []);

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

    const handleCategoryClick = (catId) => {
        const params = new URLSearchParams(searchParams);
        if (activeCategory === catId) {
            params.delete('category');
        } else {
            params.set('category', catId);
        }
        setSearchParams(params);
    };

    const handleTechClick = (techName) => {
        const params = new URLSearchParams(searchParams);
        if (activeTech.toLowerCase() === techName.toLowerCase()) {
            params.delete('tech');
        } else {
            params.set('tech', techName);
        }
        setSearchParams(params);
    };

    const handleFreelanceClick = () => {
        const params = new URLSearchParams(searchParams);
        if (isFreelance) {
            params.delete('freelance');
        } else {
            params.set('freelance', 'true');
        }
        setSearchParams(params);
    };

    const handleResetFilters = () => {
        setSearchParams(new URLSearchParams());
        setIsLanguagesOpen(false);
    };

    const handleBack = (e) => {
        e.preventDefault();
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    // Filtered projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            // 1. Role / Category filter
            if (activeCategory) {
                const cat = getProjectCategory(project);
                if (cat !== activeCategory) return false;
            }
            // 2. Freelance filter
            if (isFreelance) {
                if (!freelanceIds.includes(project.id)) return false;
            }
            // 3. Tech filter
            if (activeTech) {
                if (!matchesTech(project.tech, activeTech)) return false;
            }
            return true;
        });
    }, [activeCategory, isFreelance, activeTech]);

    const hasActiveFilters = activeCategory !== '' || activeTech !== '' || isFreelance;

    return (
        <div className="container archive-container">

            <Starfield isHovering={isOnTop} />
            <CursorGradient />

            {/* HEADER ROW */}
            <Link to="/" onClick={handleBack} className="back-link" ref={headerRef}>
                <FaArrowLeft /> John Cedric Abaloyan
            </Link>

            <div className="header-row">
                <div>
                    <h1 className="archive-title">All Projects</h1>
                </div>
            </div>

            {/* --- INLINE CATEGORY & LANGUAGE FILTER ROW --- */}
            <div className="archive-filter-section">
                <div className="inline-categories-row">
                    {categoryFilters.map(cat => {
                        const isActive = activeCategory === cat.id;
                        const count = projects.filter(p => getProjectCategory(p) === cat.id).length;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                className={`category-pill-btn ${isActive ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat.id)}
                            >
                                <span className="category-emoji">{cat.emoji}</span>
                                <span className="category-label">{cat.label}</span>
                                <span className="category-count">{count}</span>
                            </button>
                        );
                    })}

                    {/* Languages Accordion Button */}
                    <button
                        type="button"
                        className={`category-pill-btn language-pill-trigger ${isLanguagesOpen || activeTech || isFreelance ? 'active' : ''}`}
                        onClick={() => setIsLanguagesOpen(prev => !prev)}
                        aria-expanded={isLanguagesOpen}
                    >
                        <span className="category-emoji">💻</span>
                        <span className="category-label">
                            Languages
                            {isFreelance ? ' (Freelance)' : activeTech ? `: ${activeTech}` : ''}
                        </span>
                        <span className={`language-chevron ${isLanguagesOpen ? 'open' : ''}`}>
                            <FaChevronDown />
                        </span>
                    </button>
                </div>

                {/* --- COLLAPSIBLE LANGUAGES PANEL --- */}
                <div className={`collapsible-languages-panel ${isLanguagesOpen ? 'open' : ''}`}>
                    <div className="languages-panel-header">
                        <span className="languages-panel-title">Filter by technology or freelance:</span>
                        {(activeTech || isFreelance) && (
                            <button
                                type="button"
                                className="btn-clear-tech"
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams);
                                    params.delete('tech');
                                    params.delete('freelance');
                                    setSearchParams(params);
                                }}
                            >
                                Clear selection ✕
                            </button>
                        )}
                    </div>
                    <div className="archive-tech-stickers">
                        {/* Freelance Filter Badge inside Language Panel */}
                        <button
                            type="button"
                            className={`tool-sticker freelance-sticker ${isFreelance ? 'active' : ''}`}
                            style={{ '--tool-color': '#38bdf8' }}
                            onClick={handleFreelanceClick}
                        >
                            <span className="tool-icon-wrapper" style={{ color: '#38bdf8' }}>
                                <FaBriefcase />
                            </span>
                            <span className="tool-name">Freelance ({freelanceIds.length})</span>
                            {isFreelance && <span className="tool-active-dot">✕</span>}
                        </button>

                        {/* Language and Tool Stickers */}
                        {allTools.map((tool, idx) => {
                            const IconComponent = tool.icon;
                            const isSelected = activeTech.toLowerCase() === tool.name.toLowerCase();
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`tool-sticker ${isSelected ? 'active' : ''}`}
                                    style={{ '--tool-color': tool.color }}
                                    onClick={() => handleTechClick(tool.name)}
                                >
                                    <span className="tool-icon-wrapper" style={{ color: tool.color }}>
                                        <IconComponent />
                                    </span>
                                    <span className="tool-name">{tool.name}</span>
                                    {isSelected && <span className="tool-active-dot">✕</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* --- ACTIVE FILTER STATUS BAR --- */}
                {hasActiveFilters && (
                    <div className="archive-active-status">
                        <div className="active-filter-chips">
                            <span className="filter-summary-text">
                                Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
                            </span>

                            {activeCategory && (
                                <span className="filter-chip">
                                    Category: <strong>{categoryFilters.find(c => c.id === activeCategory)?.label}</strong>
                                    <button type="button" onClick={() => handleCategoryClick(activeCategory)}>✕</button>
                                </span>
                            )}

                            {isFreelance && (
                                <span className="filter-chip">
                                    Type: <strong>Freelance</strong>
                                    <button type="button" onClick={handleFreelanceClick}>✕</button>
                                </span>
                            )}

                            {activeTech && (
                                <span className="filter-chip">
                                    Tech: <strong>{activeTech}</strong>
                                    <button type="button" onClick={() => handleTechClick(activeTech)}>✕</button>
                                </span>
                            )}
                        </div>

                        <button type="button" className="btn-reset-all" onClick={handleResetFilters}>
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* PROJECTS DISPLAY */}
            {filteredProjects.length === 0 ? (
                <div className="archive-empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No matching projects found</h3>
                    <p>No projects match your current role or tech filter combination.</p>
                    <button type="button" className="btn-clear-filter-alt" onClick={handleResetFilters}>
                        Reset Filters & View All
                    </button>
                </div>
            ) : (
                <div className={`project-display ${view}`}>
                    {filteredProjects.map((project, index) => (
                        <Link to={`/project/${project.id}`} key={project.id || index}>
                            <div className="archive-card">

                                {/* IMAGE */}
                                <div className="project-image">
                                    <ProjectThumbnail gallery={project.gallery} title={project.title} />
                                </div>

                                {/* TITLE & DESC */}
                                <div className="col-info">
                                    <div className="archive-project-header">
                                        <h3 className="archive-project-title">{project.title}</h3>
                                        {project.year && <span className="archive-year-badge">{project.year}</span>}
                                    </div>
                                    <p className="archive-desc">{project.tagline}</p>

                                    {/* ROLES */}
                                    {project.role && project.role.length > 0 && (
                                        <div className="archive-roles">
                                            {project.role.map((r, rIdx) => (
                                                <span key={rIdx} className="archive-role-tag">
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* TECH */}
                                <div className="col-tech">
                                    <span className="col-label">Tech Used</span>
                                    <div className="tech-list">
                                        <div className="tags">
                                            {project.tech.map(tag => {
                                                const toolInfo = getToolInfo(tag);
                                                const IconComponent = toolInfo?.icon;
                                                const toolColor = toolInfo?.color || 'var(--accent)';
                                                const isMatch = activeTech && matchesTech([tag], activeTech);

                                                return (
                                                    <span
                                                        key={tag}
                                                        className={`tag ${isMatch ? 'active-tag' : ''}`}
                                                        style={{ '--tool-color': toolColor }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleTechClick(tag);
                                                        }}
                                                        title={`Filter by ${tag}`}
                                                    >
                                                        {IconComponent && (
                                                            <span className="tag-icon" style={{ color: isMatch ? '#0f172a' : toolColor }}>
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

                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Archive;

