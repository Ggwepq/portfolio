import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Starfield = ({ isPlaying, isHovering }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sky = containerRef.current;

    let starCount = 60;
    if (window.matchMedia("(max-width: 600px)").matches) {
      starCount = 20;
    }

    let ctx = gsap.context(() => {
      const starChar = "✦";

      for (let i = 0; i < starCount; i++) {
        const el = document.createElement("div");
        el.className = "star";
        el.textContent = starChar;
        el.style.left = Math.random() * 100 + "%";
        el.style.top = Math.random() * 100 + "%";
        const size = gsap.utils.random(8, 20);
        el.style.fontSize = size + "px";
        sky.appendChild(el);

        const sparkle = () => {
          if (!sky) return;
          gsap.timeline({ onComplete: sparkle })
            .set(el, { opacity: 0, scale: 0.2 })
            .to(el, {
              opacity: gsap.utils.random(0.5, 1),
              scale: gsap.utils.random(1.2, 2),
              duration: gsap.utils.random(0.5, 1.5),
              ease: "power2.out"
            })
            .to(el, {
              opacity: 0,
              scale: 0.1,
              duration: gsap.utils.random(0.5, 1),
              ease: "power1.inOut",
              delay: gsap.utils.random(0.2, 1)
            });
        };
        gsap.delayedCall(Math.random() * 3, sparkle);
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (sky) sky.innerHTML = '';
    };
  }, []);

  // 2. DETERMINE CLASS NAME
  let className = "";
  if (isPlaying) className = "playing";
  else if (isHovering) className = "hovering";

  return (
    <div
      ref={containerRef}
      id="sky"
      className={className}
    />
  );
};
export default Starfield;
