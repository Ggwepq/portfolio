import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPaperPlane, FaTimes, FaRedo } from 'react-icons/fa';
import { ROLEPLAY_SEQUENCES } from '../data/kaomojiSequences';
import { projects } from '../data/projects';
import './ChatCompanion.css';

const SUGGESTIONS = [
    { icon: '📱', title: 'MoneySense', desc: 'On-device offline currency identifier', query: 'What is MoneySense and how does the AI work?' },
    { icon: '💼', title: 'Liberty Internship', desc: '200% faster MySQL migration', query: 'Tell me about Cedric\'s database migration internship' },
    { icon: '⚡', title: 'Tech Stack', desc: 'Languages, frameworks & tools', query: 'What is Cedric\'s complete tech stack?' },
    { icon: '🎮', title: 'Game Development', desc: 'Unity C# hack & slash combat', query: 'Did Cedric build any games? Tell me about Samurai\'s Revenge' },
    { icon: '📬', title: 'Hire Cedric', desc: 'Contact & availability', query: 'How can I contact or hire Cedric?' },
];

const PROMPT_HINTS = [
    'Know more about Cedric... ✦',
    'Ask me about MoneySense 📱',
    'Curious about Cedric\'s tech stack? ⚡',
    'Fedora Linux user btw 🐧',
    'Ask why you should hire Cedric 👀',
    'Chat with me ✨',
    'Click the pic to see magic ✨',
];

const MUSIC_HINTS = [
    'Vibing to the beat! 🎵',
    'Love this track! ♫',
    'Jamming right now ✨',
    'Ask me about Cedric\'s music taste 🎧',
];

const RELAX_HINTS = [
    'Zzz... Taking a quick breather ☕',
    'Relaxing in cyber space ✨',
    'Click me to wake me up! 🌸',
];

// Helper to parse links, bold text, and code
function parseFormattedLine(line, onNavigate) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: line.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'link', text: match[1], url: match[2] });
        lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < line.length) {
        parts.push({ type: 'text', content: line.slice(lastIndex) });
    }

    return (
        <>
            {parts.map((part, pIdx) => {
                if (part.type === 'link') {
                    const isInternal = part.url.startsWith('/');
                    const isButton = part.text.includes('↗') || isInternal;

                    return (
                        <a
                            key={pIdx}
                            href={part.url}
                            className={isButton ? 'chat-project-badge-link' : 'chat-inline-link'}
                            onClick={(e) => {
                                if (isInternal && onNavigate) {
                                    e.preventDefault();
                                    onNavigate(part.url);
                                }
                            }}
                            target={isInternal ? undefined : '_blank'}
                            rel={isInternal ? undefined : 'noopener noreferrer'}
                        >
                            <span>{part.text}</span>
                            {isButton && !part.text.includes('↗') && <span className="badge-arrow">↗</span>}
                        </a>
                    );
                }

                let formatted = part.content;
                formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formatted = formatted.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

                return <span key={pIdx} dangerouslySetInnerHTML={{ __html: formatted }} />;
            })}
        </>
    );
}

// Helper to render formatted bot messages with links and lists
function formatBotMessage(text, onNavigate) {
    if (!text) return '';

    const lines = text.split('\n');
    const elements = [];
    let currentListItems = [];

    const flushList = (keyPrefix) => {
        if (currentListItems.length > 0) {
            elements.push(
                <ul key={`ul-${keyPrefix}`} className="chat-message-list">
                    {currentListItems}
                </ul>
            );
            currentListItems = [];
        }
    };

    lines.forEach((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const cleanLine = trimmed.substring(2);
            currentListItems.push(
                <li key={idx}>
                    {parseFormattedLine(cleanLine, onNavigate)}
                </li>
            );
        } else {
            flushList(idx);
            if (trimmed === '') {
                elements.push(<div key={idx} className="chat-spacer" />);
            } else {
                const isStandaloneLink = trimmed.startsWith('[') && trimmed.endsWith(')');
                elements.push(
                    <p key={idx} className={isStandaloneLink ? 'chat-link-paragraph' : ''}>
                        {parseFormattedLine(trimmed, onNavigate)}
                    </p>
                );
            }
        }
    });

    flushList('end');
    return elements;
}

// The expressive kaomoji face system
function AnimatedPixelFace({
    pupilOffset = { x: 0, y: 0 },
    isHovered = false,
    isPillHovered = false,
    isOddsHovered = false,
    isButtonHovered = false,
    isLinkHovered = false,
    isFormActive = false,
    isProjectPage = false,
    isWinking = false,
    mood = 'idle',
    size = 'normal',
    isMusicPlaying = false,
    isBlinking = false,
    isRelaxing = false,
    idleFace = null,
    idleMood = 'happy',
    idleEffect = 'happy',
    idleKey = 0,
}) {
    const isCold = mood === 'cold';
    const isThinking = mood === 'thinking';
    const isHappy = mood === 'happy';
    const isVibing = isMusicPlaying && !isCold && !isThinking;

    // Eye shift amount clamped for kaomoji
    const eyeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isRelaxing || isBlinking ? 'none' : `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
        transition: 'transform 0.08s ease-out',
    };

    // Calculate font size class depending on idleFace length for optimal fitting inside bubble
    const faceLen = idleFace ? idleFace.length : 0;
    const lenClass = faceLen > 7 ? 'long-glyph' : faceLen > 4 ? 'mid-glyph' : 'short-glyph';

    return (
        <div
            className={`pixel-face-wrapper ${size} ${mood} ${isVibing ? 'vibing' : ''} ${
                isRelaxing ? `relaxing ${idleMood}` : ''
            } ${isHovered ? 'hovered' : ''} ${isPillHovered ? 'pill-hovered' : ''} ${
                isOddsHovered ? 'odds-amazed' : ''
            } ${isWinking ? 'winking' : ''} ${isFormActive ? 'form-active' : ''} ${isButtonHovered ? 'button-hovered' : ''} ${
                isLinkHovered ? 'link-hovered' : ''
            } ${isProjectPage ? 'project-page-active' : ''}`}
        >
            {isCold ? (
                /* Cold deadpan: ≖_≖ */
                <span className="pixel-glyph-face cold">≖_≖</span>
            ) : isThinking ? (
                /* Thinking: •_• */
                <span className="pixel-glyph-face thinking">•_•</span>
            ) : isWinking ? (
                /* Winking on click: ◕ ‿ < */
                <span className="pixel-glyph-face winking">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className="pixel-eye-pupil">◕</span>
                    </span>
                    <span className="pixel-mouth-glyph">‿</span>
                    <span className="pixel-eye-glyph wink-eye">&lt;</span>
                </span>
            ) : isOddsHovered ? (
                /* Simple wow / O mouth face when ODDS card is hovered: ◕ o ◕ */
                <span className="pixel-glyph-face amazed">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                    <span className="pixel-mouth-glyph wow-mouth">o</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                </span>
            ) : isHovered ? (
                /* Mascot bubble hovered directly: (⌒ω⌒) without parentheses -> ⌒ω⌒ */
                <span className="pixel-glyph-face bubble-hovered">
                    <span className="kaomoji-eye">⌒</span>
                    <span className="pixel-mouth-glyph cat-mouth">ω</span>
                    <span className="kaomoji-eye">⌒</span>
                </span>
            ) : isFormActive ? (
                /* Form typing / focus: focused attentive face: • ◡ • */
                <span className="pixel-glyph-face form-typing">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '•'}
                        </span>
                    </span>
                    <span className="pixel-mouth-glyph form-mouth">◡</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '•'}
                        </span>
                    </span>
                </span>
            ) : isButtonHovered ? (
                /* Button hovered: eager smiling anticipation: ˆ ᴗ ˆ */
                <span className="pixel-glyph-face button-hovered">
                    <span className="kaomoji-eye">ˆ</span>
                    <span className="pixel-mouth-glyph button-mouth">ᴗ</span>
                    <span className="kaomoji-eye">ˆ</span>
                </span>
            ) : isPillHovered ? (
                /* Pill hovered: ( ◕▿◕ ) without parentheses -> ◕▿◕ */
                <span className="pixel-glyph-face pill-hovered">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                    <span className="pixel-mouth-glyph pill-mouth">▿</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                </span>
            ) : isLinkHovered ? (
                /* Link hovered: curious glance with pupil tracking: ・‿・ */
                <span className="pixel-glyph-face link-hovered">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '・'}
                        </span>
                    </span>
                    <span className="pixel-mouth-glyph link-mouth">‿</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '・'}
                        </span>
                    </span>
                </span>
            ) : isVibing ? (
                /* Music vibing: ♪ ˆᗜˆ ♫ */
                <span className="pixel-glyph-face vibing">
                    <span className="vibing-note left">♪</span>
                    <span className="vibing-face-text">{isHovered ? '⌒ω⌒' : 'ˆᗜˆ'}</span>
                    <span className="vibing-note right">♫</span>
                </span>
            ) : isProjectPage ? (
                /* Specific project page: admiring sparkle face: ✧ ‿ ✧ */
                <span className="pixel-glyph-face project-page">
                    <span className="project-sparkle-eye left">✧</span>
                    <span className="pixel-mouth-glyph project-mouth">‿</span>
                    <span className="project-sparkle-eye right">✧</span>
                </span>
            ) : isHappy ? (
                /* Happy kaomoji: ˶ˆ ᗜ ˆ˵ */
                <span className="pixel-glyph-face happy">
                    <span className="kaomoji-blush left">˶</span>
                    <span className="kaomoji-happy-eye">ˆ</span>
                    <span className="pixel-mouth-glyph happy-open">ᗜ</span>
                    <span className="kaomoji-happy-eye">ˆ</span>
                    <span className="kaomoji-blush right">˵</span>
                </span>
            ) : isRelaxing && idleFace ? (
                /* Idle Roleplay Kaomoji player with micro-animations & smooth transitions */
                <span
                    key={idleKey}
                    className={`pixel-glyph-face idle-playing ${idleMood} ${idleEffect} ${lenClass}`}
                >
                    {/* Micro-animations based on current roleplay story step effect */}
                    {idleEffect === 'love' && (
                        <>
                            <span className="anim-heart h1">♥</span>
                            <span className="anim-heart h2">♥</span>
                        </>
                    )}
                    {idleEffect === 'kiss' && (
                        <span className="anim-kiss-heart">♥</span>
                    )}
                    {(idleEffect === 'wink' || idleEffect === 'sparkle') && (
                        <span className="anim-wink-star">✧</span>
                    )}
                    {idleEffect === 'sleep' && (
                        <span className="anim-sleep-z">z</span>
                    )}
                    <span className="kaomoji-face-text">{idleFace}</span>
                </span>
            ) : (
                /* Default Active Idle: ◕ ‿ ◕ with eye tracking and blinking */
                <span className="pixel-glyph-face idle">
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                    <span className="pixel-mouth-glyph">‿</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>
                        <span className={`pixel-eye-pupil ${isBlinking ? 'blinking' : ''}`}>
                            {isBlinking ? '—' : '◕'}
                        </span>
                    </span>
                </span>
            )}
        </div>
    );
}

const ChatCompanion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [mood, setMood] = useState('idle'); // 'idle' | 'happy' | 'thinking' | 'cold'
    const [isTriggerHovered, setIsTriggerHovered] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isRelaxing, setIsRelaxing] = useState(false);
    const [idleFace, setIdleFace] = useState('◕‿◕');
    const [idleMood, setIdleMood] = useState('happy');
    const [idleEffect, setIdleEffect] = useState('happy');
    const [idleKey, setIdleKey] = useState(0);
    const [isPillHovered, setIsPillHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);
    const [isOddsHovered, setIsOddsHovered] = useState(false);
    const [isWinking, setIsWinking] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);
    const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const lastActivityRef = useRef(Date.now());
    const seqRef = useRef({ seqIdx: 0, stepIdx: 0 });
    const recentInteractionRef = useRef({ type: null, detail: null, href: null, time: 0 });

    const isProjectPage = location.pathname.startsWith('/project/');

    // Generate context-aware conversation opener based on user page and recent interactions
    const getContextGreeting = () => {
        const now = Date.now();
        const recent = recentInteractionRef.current;
        const isRecent = recent.type && (now - recent.time < 35000);

        // 1. Currently on a specific project page (/project/:id)
        if (location.pathname.startsWith('/project/')) {
            const projectId = location.pathname.split('/project/')[1]?.split('?')[0]?.replace(/\/$/, '');
            const currentProject = projects.find((p) => p.id === projectId);
            if (currentProject) {
                const topTech = (currentProject.tech || []).slice(0, 3).join(', ');
                return `Hey there! I see you're looking into **${currentProject.title}**! ${currentProject.tagline ? currentProject.tagline + ' ' : ''}Ask me anything about its architecture, tech stack (${topTech}), or Cedric's role in building it! ✦`;
            }
            return `Hey there! I see you're exploring one of Cedric's project deep-dives! Ask me anything about the architecture, challenges, or tech stack behind it! ✦`;
        }

        // 2. Currently on the Archive page (/archive)
        if (location.pathname === '/archive') {
            const searchParams = new URLSearchParams(location.search);
            const techParam = searchParams.get('tech');
            if (techParam) {
                return `Hey there! I see you're filtering the project archive for **${techParam}**! Cedric has built multiple systems with it. Want to know which project highlights it best? ✦`;
            }
            return `Hey! Exploring Cedric's project archive? There are works here spanning AI, mobile engineering, web systems, and game dev. Looking for something specific, or want a curated recommendation? ✦`;
        }

        // 3. Currently on the Resume page (/resume)
        if (location.pathname === '/resume') {
            return `Welcome! Looking over Cedric's resume and qualifications? I can give you a quick TL;DR of his experience, top achievements, or technical competencies. What would you like to know? ✦`;
        }

        // 4. Recent user interactions on current page
        if (isRecent) {
            if (recent.type === 'form') {
                return `Hey! I noticed you were writing a message in the contact form! Need any help drafting your inquiry, checking Cedric's availability, or prefer his direct email or LinkedIn? ✦`;
            }

            if (recent.type === 'odds') {
                return `Hey! Did that pink cyberpunk **ODDS Studio** card catch your attention? ODDS is Cedric's collaborative tech and design group. Want to hear more about what they build together or their creative projects? ✦`;
            }

            if (recent.type === 'pill' && recent.detail) {
                const cleanTag = recent.detail.replace(/\s+/g, ' ').trim();
                if (cleanTag.length > 0 && cleanTag.length < 35) {
                    return `Hey! I see you were checking out **${cleanTag}**! Cedric has hands-on production experience with it. Ask me how he uses it or which projects showcase it best! ✦`;
                }
            }

            if (recent.type === 'project_link' && recent.detail) {
                const cleanTitle = recent.detail.replace(/\s+/g, ' ').trim();
                return `Hey! Interested in **${cleanTitle}**? I can tell you all about how Cedric built it, key architecture choices, and the technical challenges he solved! ✦`;
            }
        }

        // 5. Music currently playing
        if (isMusicPlaying) {
            return `Hey! Jamming to the music with Cedric? 🎵 While we vibe, ask me anything about his projects, coding stack, or work experience! ✦`;
        }

        // 6. Default clean greeting
        return `Hey there! I’m **Cedjuani**, Cedric’s companion. Ask me anything about his projects, technical stack, internship work, or background! ✦`;
    };

    // Context-sensitive topic suggestion cards
    const getContextSuggestions = () => {
        if (location.pathname.startsWith('/project/')) {
            const projectId = location.pathname.split('/project/')[1]?.split('?')[0]?.replace(/\/$/, '');
            const currentProject = projects.find((p) => p.id === projectId);
            if (currentProject) {
                return [
                    { icon: '🧠', title: 'Architecture', desc: `How ${currentProject.title} was built`, query: `Tell me about the architecture and technology behind ${currentProject.title}` },
                    { icon: '🛠️', title: "Cedric's Role", desc: 'Key contributions & design', query: `What was Cedric's specific role in ${currentProject.title}?` },
                    { icon: '⚡', title: 'Challenges', desc: 'Problems & solutions', query: `What were the biggest engineering challenges in ${currentProject.title}?` },
                    { icon: '💼', title: 'Tech Stack', desc: (currentProject.tech || []).slice(0, 3).join(', '), query: `What technologies and frameworks were used in ${currentProject.title}?` },
                ];
            }
        }
        return SUGGESTIONS;
    };

    // Listen for ODDS card hover event
    useEffect(() => {
        const handleOddsHover = (e) => {
            const isHovered = !!e.detail?.isHovered;
            setIsOddsHovered(isHovered);
            if (isHovered) {
                recentInteractionRef.current = {
                    type: 'odds',
                    detail: 'ODDS Studio',
                    time: Date.now(),
                };
            }
        };
        window.addEventListener('portfolio:odds-hover', handleOddsHover);
        return () => window.removeEventListener('portfolio:odds-hover', handleOddsHover);
    }, []);

    // 10-second idle relaxation detector
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now();
            if (isRelaxing) {
                setIsRelaxing(false);
            }
        };

        const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

        const checkInterval = setInterval(() => {
            if (!isOpen && !isMusicPlaying && Date.now() - lastActivityRef.current >= 10000) {
                setIsRelaxing(true);
            }
        }, 1000);

        return () => {
            events.forEach((ev) => window.removeEventListener(ev, handleActivity));
            clearInterval(checkInterval);
        };
    }, [isOpen, isMusicPlaying, isRelaxing]);

    // Idle Roleplay Sequencer: Plays structured emotional story arcs
    // (Happy to neutral only, strictly zero sad/angry kaomojis, no parentheses)
    useEffect(() => {
        if (!isRelaxing) return;

        // Pick a random starting sequence
        const startSeqIdx = Math.floor(Math.random() * ROLEPLAY_SEQUENCES.length);
        seqRef.current = { seqIdx: startSeqIdx, stepIdx: 0 };

        const initialStep = ROLEPLAY_SEQUENCES[startSeqIdx].steps[0];
        setIdleFace(initialStep.face);
        setIdleMood(initialStep.mood);
        setIdleEffect(initialStep.effect);
        setIdleKey((k) => k + 1);

        const cycleInterval = setInterval(() => {
            const { seqIdx, stepIdx } = seqRef.current;
            const currentSeq = ROLEPLAY_SEQUENCES[seqIdx];
            let nextSeqIdx = seqIdx;
            let nextStepIdx = stepIdx + 1;

            if (nextStepIdx >= currentSeq.steps.length) {
                // Current story arc completed! Transition smoothly to next roleplay sequence
                let pickSeq = Math.floor(Math.random() * ROLEPLAY_SEQUENCES.length);
                if (pickSeq === seqIdx && ROLEPLAY_SEQUENCES.length > 1) {
                    pickSeq = (seqIdx + 1) % ROLEPLAY_SEQUENCES.length;
                }
                nextSeqIdx = pickSeq;
                nextStepIdx = 0;
            }

            seqRef.current = { seqIdx: nextSeqIdx, stepIdx: nextStepIdx };
            const stepData = ROLEPLAY_SEQUENCES[nextSeqIdx].steps[nextStepIdx];
            setIdleFace(stepData.face);
            setIdleMood(stepData.mood);
            setIdleEffect(stepData.effect);
            setIdleKey((k) => k + 1);
        }, 3400);

        return () => clearInterval(cycleInterval);
    }, [isRelaxing]);

    // Comprehensive Interaction Detector: Tracks Pills, Buttons, Links, and Forms across the site
    useEffect(() => {
        const handleMouseOver = (e) => {
            if (!e.target || e.target.closest?.('.companion-wrapper')) {
                setIsPillHovered(false);
                setIsButtonHovered(false);
                setIsLinkHovered(false);
                return;
            }

            // Guard against ODDS card hover: ODDS hover should not trigger link/pill/button hover on companion
            if (e.target.closest?.('.odds-group-card-wrapper, .odds-group-card, [class*="odds"]')) {
                setIsPillHovered(false);
                setIsButtonHovered(false);
                setIsLinkHovered(false);
                return;
            }

            // 1. Tech tags / badges / pills (highest specificity for chips)
            const pillEl = e.target.closest?.(
                '.cute-tag-pill, .category-pill-btn, .cute-back-pill, .role-pills-wrap, .cute-role-badge, .archive-role-tag, .tag, .tool-sticker, .filter-chip, [class*="pill"]'
            );
            if (pillEl) {
                setIsPillHovered(true);
                setIsButtonHovered(false);
                setIsLinkHovered(false);
                recentInteractionRef.current = {
                    type: 'pill',
                    detail: pillEl.innerText?.trim() || '',
                    time: Date.now(),
                };
                return;
            }

            // 2. Buttons across the site
            const buttonEl = e.target.closest?.(
                'button, [role="button"], .submit-btn, .btn, .btn-primary, [class*="-btn"], input[type="submit"], input[type="button"]'
            );
            if (buttonEl) {
                setIsButtonHovered(true);
                setIsPillHovered(false);
                setIsLinkHovered(false);
                recentInteractionRef.current = {
                    type: 'button',
                    detail: buttonEl.innerText?.trim() || buttonEl.getAttribute('aria-label') || '',
                    time: Date.now(),
                };
                return;
            }

            // 3. Links across the site
            const linkEl = e.target.closest?.('a');
            if (linkEl) {
                setIsLinkHovered(true);
                setIsPillHovered(false);
                setIsButtonHovered(false);
                const href = linkEl.getAttribute('href') || '';
                if (href.includes('/project/')) {
                    const projId = href.split('/project/')[1]?.split(/[?#]/)[0];
                    const matchProj = projects.find((p) => p.id === projId);
                    recentInteractionRef.current = {
                        type: 'project_link',
                        detail: matchProj ? matchProj.title : linkEl.innerText?.trim() || '',
                        href,
                        time: Date.now(),
                    };
                } else {
                    recentInteractionRef.current = {
                        type: 'link',
                        detail: linkEl.innerText?.trim() || '',
                        href,
                        time: Date.now(),
                    };
                }
                return;
            }

            // Default: hovering regular layout or background elements
            setIsPillHovered(false);
            setIsButtonHovered(false);
            setIsLinkHovered(false);
        };

        const handleMouseOut = (e) => {
            if (!e.relatedTarget) {
                setIsPillHovered(false);
                setIsButtonHovered(false);
                setIsLinkHovered(false);
            }
        };

        const handleFocusIn = (e) => {
            if (e.target?.closest?.('.companion-wrapper')) return;
            const formEl = e.target?.closest?.('input, textarea, select');
            if (formEl) {
                setIsFormActive(true);
                recentInteractionRef.current = {
                    type: 'form',
                    detail: formEl.name || formEl.placeholder || 'contact form',
                    time: Date.now(),
                };
            }
        };

        const handleFocusOut = (e) => {
            if (e.target?.closest?.('.companion-wrapper')) return;
            const formEl = e.target?.closest?.('input, textarea, select');
            if (formEl) {
                setIsFormActive(false);
            }
        };

        const handleInput = (e) => {
            if (e.target?.closest?.('.companion-wrapper')) return;
            const formEl = e.target?.closest?.('input, textarea, select');
            if (formEl) {
                setIsFormActive(true);
                recentInteractionRef.current = {
                    type: 'form',
                    detail: formEl.name || formEl.placeholder || 'contact form',
                    time: Date.now(),
                };
            }
        };

        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });
        document.addEventListener('focusin', handleFocusIn, { passive: true });
        document.addEventListener('focusout', handleFocusOut, { passive: true });
        document.addEventListener('input', handleInput, { passive: true });

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
            document.removeEventListener('input', handleInput);
        };
    }, []);

    // Natural eye blinking timer (every 3.2s to 6.4s for 160ms)
    useEffect(() => {
        let blinkTimer;
        let timeoutBlink;

        const scheduleBlink = () => {
            const delay = 3200 + Math.random() * 3200;
            blinkTimer = setTimeout(() => {
                setIsBlinking(true);
                timeoutBlink = setTimeout(() => {
                    setIsBlinking(false);
                    scheduleBlink();
                }, 160);
            }, delay);
        };

        scheduleBlink();
        return () => {
            clearTimeout(blinkTimer);
            clearTimeout(timeoutBlink);
        };
    }, []);

    // Audio detector: listens for HTMLMediaElement play/pause across the entire page
    useEffect(() => {
        const checkAudioStatus = () => {
            const audios = document.querySelectorAll('audio');
            let playing = false;
            audios.forEach((audio) => {
                if (!audio.paused && !audio.ended) {
                    playing = true;
                }
            });
            setIsMusicPlaying((prev) => (prev !== playing ? playing : prev));
        };

        const handlePlay = () => setIsMusicPlaying(true);
        const handlePause = () => setTimeout(checkAudioStatus, 80);
        const handleCustomMusic = (e) => {
            if (e.detail && typeof e.detail.isPlaying === 'boolean') {
                setIsMusicPlaying(e.detail.isPlaying);
            } else {
                checkAudioStatus();
            }
        };

        window.addEventListener('play', handlePlay, true);
        window.addEventListener('playing', handlePlay, true);
        window.addEventListener('pause', handlePause, true);
        window.addEventListener('ended', handlePause, true);
        window.addEventListener('portfolio:music-state', handleCustomMusic);

        checkAudioStatus();
        const interval = setInterval(checkAudioStatus, 400);

        return () => {
            window.removeEventListener('play', handlePlay, true);
            window.removeEventListener('playing', handlePlay, true);
            window.removeEventListener('pause', handlePause, true);
            window.removeEventListener('ended', handlePause, true);
            window.removeEventListener('portfolio:music-state', handleCustomMusic);
            clearInterval(interval);
        };
    }, []);

    const handleNavigate = (url) => {
        navigate(url);
        setIsOpen(false);
    };

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey there! I’m **Cedjuani**, Cedric’s companion. Ask me anything about his projects, technical stack, internship work, or background! ✦",
        },
    ]);

    const mascotRef = useRef(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Eye tracking: Calculate pupil position towards mouse cursor
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!mascotRef.current) return;
            const rect = mascotRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const dist = Math.hypot(dx, dy);

            // Max eye distance limit for the glyph (subtle and cute)
            const maxOffset = 2.8;
            const clampedDist = Math.min(dist / 45, maxOffset);
            const angle = Math.atan2(dy, dx);

            setPupilOffset({
                x: Math.round(Math.cos(angle) * clampedDist * 10) / 10,
                y: Math.round(Math.sin(angle) * clampedDist * 10) / 10,
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cycle hint dialogue ONLY when hovered
    useEffect(() => {
        if (!isTriggerHovered) return;
        const interval = setInterval(() => {
            setHintIndex((prev) => (prev + 1) % PROMPT_HINTS.length);
        }, 3200);
        return () => clearInterval(interval);
    }, [isTriggerHovered]);

    // Clean open & close handlers with smooth transition animations
    const handleOpen = () => {
        setIsTriggerHovered(false);
        setIsWinking(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsOpen(true);
            setIsWinking(false);

            // If chat is fresh (no user messages yet), provide context-aware opening greeting
            if (messages.length <= 1) {
                const contextGreeting = getContextGreeting();
                setMessages([
                    {
                        role: 'assistant',
                        content: contextGreeting,
                    },
                ]);
            }
        }, 280);
    };

    const handleClose = () => {
        setIsTriggerHovered(false);
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 280);
    };

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, isLoading]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 250);
        }
    }, [isOpen]);

    const detectColdResponse = (text) => {
        if (!text) return false;
        const lower = text.toLowerCase();
        return (
            lower.startsWith('no.') ||
            lower.startsWith('denied.') ||
            lower.includes('inquiries are restricted') ||
            lower.includes('irrelevant.') ||
            lower.includes('request denied') ||
            lower.includes('restricted to cedric')
        );
    };

    const handleSend = async (queryText) => {
        const textToSend = typeof queryText === 'string' ? queryText : input;
        if (!textToSend.trim() || isLoading) return;

        const newMessages = [...messages, { role: 'user', content: textToSend.trim() }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setMood('thinking');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: textToSend.trim(),
                    history: newMessages.slice(-6),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Server responded with ${res.status}`);
            }

            const data = await res.json();
            const reply = data.reply || "I couldn't process that response.";

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

            if (detectColdResponse(reply)) {
                setMood('cold');
                setTimeout(() => setMood('idle'), 6000);
            } else {
                setMood('happy');
                setTimeout(() => setMood('idle'), 5000);
            }
        } catch (err) {
            console.error('Chat error:', err);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Sorry, I had trouble connecting to my server. Please check that your server is running and try again!",
                },
            ]);
            setMood('idle');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetChat = () => {
        const contextGreeting = getContextGreeting();
        setMessages([
            {
                role: 'assistant',
                content: `Chat reset! ${contextGreeting}`,
            },
        ]);
        setMood('idle');
    };

    return (
        <div className="companion-wrapper">
            {/* 1. FLOATING COMPANION TRIGGER (WHEN CLOSED) */}
            {!isOpen && (
                <div
                    className="companion-dock"
                    ref={mascotRef}
                    onMouseEnter={() => setIsTriggerHovered(true)}
                    onMouseLeave={() => setIsTriggerHovered(false)}
                >
                    {/* DIALOGUE BUBBLE: ONLY SHOWN WHEN TRIGGER IS HOVERED */}
                    {isTriggerHovered && (
                        <div className="companion-hover-dialogue" onClick={handleOpen}>
                            <span className="dialogue-sparkle">
                                {isMusicPlaying ? '🎵' : isRelaxing ? '☕' : '🌸'}
                            </span>
                            <span className="dialogue-text">
                                {isMusicPlaying
                                    ? MUSIC_HINTS[hintIndex % MUSIC_HINTS.length]
                                    : isRelaxing
                                    ? RELAX_HINTS[hintIndex % RELAX_HINTS.length]
                                    : PROMPT_HINTS[hintIndex % PROMPT_HINTS.length]}
                            </span>
                            <div className="dialogue-tail" />
                        </div>
                    )}

                    <button
                        type="button"
                        className={`companion-trigger-bubble ${isMusicPlaying ? 'vibing' : ''} ${
                            isRelaxing ? `relaxing ${idleMood}` : ''
                        } ${isTriggerHovered || isWinking ? 'blushing' : ''} ${isWinking ? 'winking' : ''} ${
                            isOddsHovered ? 'odds-amazed' : ''
                        } ${!isOddsHovered && isFormActive ? 'form-active' : ''} ${
                            !isOddsHovered && isButtonHovered ? 'btn-active' : ''
                        } ${!isOddsHovered && isLinkHovered ? 'link-active' : ''} ${
                            isProjectPage ? 'project-active' : ''
                        }`}
                        onClick={handleOpen}
                        aria-label="Open Chat Companion"
                    >
                        {/* Rosy blush cheeks on hover or when winking */}
                        {(isTriggerHovered || isWinking) && (
                            <>
                                <span className="mascot-rosy-cheek left" />
                                <span className="mascot-rosy-cheek right" />
                            </>
                        )}

                        <AnimatedPixelFace
                            pupilOffset={pupilOffset}
                            isHovered={isTriggerHovered}
                            isPillHovered={isPillHovered}
                            isOddsHovered={isOddsHovered}
                            isButtonHovered={isButtonHovered}
                            isLinkHovered={isLinkHovered}
                            isFormActive={isFormActive}
                            isProjectPage={isProjectPage}
                            isWinking={isWinking}
                            mood={mood}
                            size="normal"
                            isMusicPlaying={isMusicPlaying}
                            isBlinking={isBlinking}
                            isRelaxing={isRelaxing}
                            idleFace={idleFace}
                            idleMood={idleMood}
                            idleEffect={idleEffect}
                            idleKey={idleKey}
                        />
                    </button>
                </div>
            )}

            {/* 2. REDESIGNED CHAT DIALOGUE WINDOW */}
            {isOpen && (
                <div className={`companion-window ${mood} ${isClosing ? 'closing' : 'opening'}`}>
                    {/* Ambient Window Glow */}
                    <div className="window-ambient-glow" />

                    {/* Window Header */}
                    <header className="window-header">
                        <div className="header-identity">
                            <div className="header-avatar-morph">
                                <AnimatedPixelFace
                                    pupilOffset={{ x: 0, y: 0 }}
                                    isHovered={false}
                                    isPillHovered={isPillHovered}
                                    isOddsHovered={isOddsHovered}
                                    isButtonHovered={isButtonHovered}
                                    isLinkHovered={isLinkHovered}
                                    isFormActive={isFormActive}
                                    isProjectPage={isProjectPage}
                                    mood={mood}
                                    size="small"
                                    isMusicPlaying={isMusicPlaying}
                                    isBlinking={isBlinking}
                                    isRelaxing={false}
                                />
                            </div>
                            <div className="identity-text">
                                <div className="name-row">
                                    <h3>Cedjuani</h3>
                                    <span className="verified-sparkle">✦</span>
                                </div>
                                <div className="status-badge">
                                    <span className={`pulse-dot ${mood} ${isMusicPlaying ? 'vibing' : ''}`} />
                                    <span className="status-label">
                                        {mood === 'thinking'
                                            ? 'Thinking...'
                                            : mood === 'cold'
                                                ? 'Restricted Mode'
                                                : isMusicPlaying
                                                    ? 'Vibing to the music ♫'
                                                    : 'Have you tried clicking the picture ? 👀'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="header-buttons">
                            <button
                                type="button"
                                className="btn-header-tool"
                                onClick={handleResetChat}
                                title="Reset conversation"
                                aria-label="Reset chat"
                            >
                                <FaRedo />
                            </button>
                            <button
                                type="button"
                                className="btn-header-tool close-btn"
                                onClick={handleClose}
                                title="Close chat"
                                aria-label="Close chat"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </header>

                    {/* Chat Messages Stream */}
                    <div className="window-message-list">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`message-row ${m.role}`}>
                                <div className={`message-bubble ${m.role}`}>
                                    {m.role === 'assistant' ? formatBotMessage(m.content, handleNavigate) : m.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message-row assistant">
                                <div className="message-bubble assistant thinking">
                                    <div className="bouncing-dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <span className="thinking-hint">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Topic Cards (When Chat is Fresh) */}
                    {messages.length <= 2 && !isLoading && (
                        <div className="topic-cards-container">
                            <div className="topic-cards-header">
                                <span>Suggested topics</span>
                                <span className="topic-arrow">↓</span>
                            </div>
                            <div className="topic-cards-grid">
                                {getContextSuggestions().map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="topic-card-item"
                                        onClick={() => handleSend(item.query)}
                                        onMouseEnter={() => setIsPillHovered(true)}
                                        onMouseLeave={() => setIsPillHovered(false)}
                                    >
                                        <span className="topic-icon">{item.icon}</span>
                                        <div className="topic-info">
                                            <span className="topic-title">{item.title}</span>
                                            <span className="topic-desc">{item.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat Input Dock */}
                    <footer className="window-footer">
                        <form
                            className="chat-input-bar"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                        >
                            <span className="input-sparkle-icon">✦</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="chat-native-input"
                                placeholder="Ask about projects, stack, experience..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                maxLength={400}
                            />
                            <button
                                type="submit"
                                className="chat-submit-btn"
                                disabled={!input.trim() || isLoading}
                                aria-label="Send message"
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default ChatCompanion;
