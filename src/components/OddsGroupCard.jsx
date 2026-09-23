import { useState, useEffect, useRef } from 'react';
import './OddsGroupCard.css';

const ODDS_ASCII = ` ██████╗  ██████╗  ██████╗  ███████╗
██╔═══██╗ ██╔══██╗ ██╔══██╗ ██╔════╝
██║   ██║ ██║  ██║ ██║  ██║ ███████╗
██║   ██║ ██║  ██║ ██║  ██║ ╚════██║
╚██████╔╝ ██████╔╝ ██████╔╝ ███████║
 ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝`;

const MATRIX_CHARS = '01ODDSoddsｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ98765432';

export default function OddsGroupCard({ onHoverChange }) {
    const [isHovered, setIsHovered] = useState(false);
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHoverChange?.(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHoverChange?.(false);
    };

    // Continuous Pink Matrix Digital Rain Canvas Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let running = true;
        const fontSize = 12;
        let columns = 0;
        let drops = [];

        const initCanvas = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const width = rect.width > 0 ? rect.width : (canvas.offsetWidth || 560);
            const height = rect.height > 0 ? rect.height : (canvas.offsetHeight || 180);
            canvas.width = width;
            canvas.height = height;
            columns = Math.max(1, Math.floor(width / fontSize));
            drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -30));
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);

        const draw = () => {
            if (!running) return;

            const w = canvas.width;
            const h = canvas.height;

            // Semi-transparent fade trail matching card background
            ctx.fillStyle = 'rgba(8, 12, 24, 0.22)';
            ctx.fillRect(0, 0, w, h);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Cyberpunk Pink Matrix palette (following the card's pink aesthetic)
                if (Math.random() > 0.88) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#ff2a70';
                    ctx.shadowBlur = 8;
                } else if (Math.random() > 0.45) {
                    ctx.fillStyle = '#ff2a70';
                    ctx.shadowColor = '#ff2a70';
                    ctx.shadowBlur = 4;
                } else {
                    ctx.fillStyle = '#ff5f9e';
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, x, y);

                if (y > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            running = false;
            window.removeEventListener('resize', initCanvas);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    return (
        <section className="odds-card-section" aria-label="ODDS Studio">
            <a
                href="https://www.oddsstudio.site"
                target="_blank"
                rel="noopener noreferrer"
                className={`odds-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="Visit our group's portfolio: www.oddsstudio.site"
            >
                {/* Continuous Pink Matrix Rain Canvas */}
                <canvas ref={canvasRef} className="matrix-rain-canvas" />

                {/* Pink ASCII Art for ODDS - Glowing Up and Out */}
                <pre className="odds-ascii-art" aria-label="ODDS">
                    {ODDS_ASCII}
                </pre>

                {/* Tagline: Swaps on hover from "Let's Build Something Real." to "Visit our group's portfolio" */}
                <div className="odds-ascii-tagline">
                    <span className="odds-tagline-prompt">//</span>
                    <span key={isHovered ? 'portfolio' : 'tagline'} className="odds-tagline-text">
                        {isHovered ? "Visit our group's portfolio" : "Let's Build Something Real."}
                    </span>
                </div>
            </a>
        </section>
    );
}
