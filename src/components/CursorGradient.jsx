import { useEffect, useRef } from "react";

const CursorGradient = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable tracking on touch / mobile devices for zero overhead
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isRunning = false;
    let animationFrameId = null;

    let firstMove = true;
    const speed = 0.65; // Fast, snappy, and responsive tracking

    const animate = () => {
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;

      cursorX += distX * speed;
      cursorY += distY * speed;

      // Use GPU hardware-accelerated transform
      cursor.style.transform = `translate3d(${cursorX.toFixed(1)}px, ${cursorY.toFixed(1)}px, 0) translate(-50%, -50%)`;

      // Sleep loop when cursor has caught up closely
      if (Math.abs(distX) > 0.2 || Math.abs(distY) > 0.2) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (firstMove) {
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.transform = `translate3d(${cursorX.toFixed(1)}px, ${cursorY.toFixed(1)}px, 0) translate(-50%, -50%)`;
        firstMove = false;
      }
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <div ref={cursorRef} className="bg-gradient" aria-hidden="true" />;
};

export default CursorGradient;
