import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaTimes, FaRedo } from 'react-icons/fa';
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

// The pixelated kaomoji face: eyes and mouth only (no parentheses) with cursor-tracking eyes
function AnimatedPixelFace({ pupilOffset = { x: 0, y: 0 }, isHovered = false, mood = 'idle', size = 'normal', isMusicPlaying = false }) {
    const isCold = mood === 'cold';
    const isThinking = mood === 'thinking';
    const isHappy = mood === 'happy';
    const isVibing = isMusicPlaying && !isCold && !isThinking;

    // Eye shift amount clamped for kaomoji
    const eyeStyle = {
        display: 'inline-block',
        transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
        transition: 'transform 0.08s ease-out',
    };

    return (
        <div className={`pixel-face-wrapper ${size} ${mood} ${isVibing ? 'vibing' : ''} ${isHovered ? 'hovered' : ''}`}>
            {isCold ? (
                <span className="pixel-glyph-face cold">≖_≖</span>
            ) : isThinking ? (
                <span className="pixel-glyph-face thinking">•_•</span>
            ) : isVibing ? (
                <span className="pixel-glyph-face vibing">
                    <span className="vibing-note left">♪</span>
                    {isHovered ? (
                        <>
                            <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                            <span className="pixel-mouth-glyph smile-more">◡</span>
                            <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                        </>
                    ) : (
                        <span className="vibing-face-text">ˆᗜˆ</span>
                    )}
                    <span className="vibing-note right">♫</span>
                </span>
            ) : isHappy ? (
                <span className="pixel-glyph-face happy">ˆᗜˆ</span>
            ) : isHovered ? (
                <span className="pixel-glyph-face hovered">
                    <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                    <span className="pixel-mouth-glyph smile-more">◡</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                </span>
            ) : (
                <span className="pixel-glyph-face idle">
                    <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                    <span className="pixel-mouth-glyph">‿</span>
                    <span className="pixel-eye-glyph" style={eyeStyle}>◕</span>
                </span>
            )}
        </div>
    );
}

const ChatCompanion = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [mood, setMood] = useState('idle'); // 'idle' | 'happy' | 'thinking' | 'cold'
    const [isTriggerHovered, setIsTriggerHovered] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);
    const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Audio detector: listens for HTMLMediaElement play/pause across the entire page
    useEffect(() => {
        const checkAudioStatus = () => {
            const audios = document.querySelectorAll('audio');
            let playing = false;
            audios.forEach((audio) => {
                if (!audio.paused && !audio.ended && audio.currentTime > 0) {
                    playing = true;
                }
            });
            setIsMusicPlaying(playing);
        };

        const handlePlay = (e) => {
            if (e.target && e.target.tagName === 'AUDIO') {
                setIsMusicPlaying(true);
            }
        };

        const handlePause = (e) => {
            if (e.target && e.target.tagName === 'AUDIO') {
                checkAudioStatus();
            }
        };

        window.addEventListener('play', handlePlay, true);
        window.addEventListener('pause', handlePause, true);
        window.addEventListener('ended', handlePause, true);

        checkAudioStatus();
        const interval = setInterval(checkAudioStatus, 800);

        return () => {
            window.removeEventListener('play', handlePlay, true);
            window.removeEventListener('pause', handlePause, true);
            window.removeEventListener('ended', handlePause, true);
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

    // Clean open & close handlers (guarantees hover state is never stuck)
    const handleOpen = () => {
        setIsTriggerHovered(false);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsTriggerHovered(false);
        setIsOpen(false);
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
        setMessages([
            {
                role: 'assistant',
                content: "Chat reset! What else would you like to know about Cedric?",
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
                    {/* DIALOGUE BUBBLE: ONLY SHOWN WHEN HOVERED */}
                    {isTriggerHovered && (
                        <div className="companion-hover-dialogue" onClick={handleOpen}>
                            <span className="dialogue-sparkle">{isMusicPlaying ? '🎵' : '🌸'}</span>
                            <span className="dialogue-text">
                                {isMusicPlaying
                                    ? MUSIC_HINTS[hintIndex % MUSIC_HINTS.length]
                                    : PROMPT_HINTS[hintIndex % PROMPT_HINTS.length]}
                            </span>
                            <div className="dialogue-tail" />
                        </div>
                    )}

                    <button
                        type="button"
                        className={`companion-trigger-bubble ${isMusicPlaying ? 'vibing' : ''}`}
                        onClick={handleOpen}
                        aria-label="Open Chat Companion"
                    >
                        <AnimatedPixelFace
                            pupilOffset={pupilOffset}
                            isHovered={isTriggerHovered}
                            mood={mood}
                            size="normal"
                            isMusicPlaying={isMusicPlaying}
                        />
                    </button>
                </div>
            )}

            {/* 2. REDESIGNED CHAT DIALOGUE WINDOW */}
            {isOpen && (
                <div className={`companion-window ${mood}`}>
                    {/* Ambient Window Glow */}
                    <div className="window-ambient-glow" />

                    {/* Window Header */}
                    <header className="window-header">
                        <div className="header-identity">
                            <AnimatedPixelFace
                                pupilOffset={{ x: 0, y: 0 }}
                                isHovered={false}
                                mood={mood}
                                size="small"
                                isMusicPlaying={isMusicPlaying}
                            />
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
                                {m.role === 'assistant' && (
                                    <div className="message-avatar-container">
                                        <AnimatedPixelFace
                                            pupilOffset={{ x: 0, y: 0 }}
                                            isHovered={false}
                                            mood={idx === messages.length - 1 ? mood : 'idle'}
                                            size="micro"
                                            isMusicPlaying={isMusicPlaying && idx === messages.length - 1}
                                        />
                                    </div>
                                )}
                                <div className={`message-bubble ${m.role}`}>
                                    {m.role === 'assistant' ? formatBotMessage(m.content, handleNavigate) : m.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message-row assistant">
                                <div className="message-avatar-container">
                                    <AnimatedPixelFace
                                        pupilOffset={{ x: 0, y: 0 }}
                                        isHovered={false}
                                        mood="thinking"
                                        size="micro"
                                    />
                                </div>
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
                                {SUGGESTIONS.map((item, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="topic-card-item"
                                        onClick={() => handleSend(item.query)}
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
