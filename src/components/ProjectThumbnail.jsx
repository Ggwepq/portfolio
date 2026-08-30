import { useState, useEffect, useRef } from 'react';

const ProjectThumbnail = ({ gallery, title, isHovered }) => {
  const [internalHovering, setInternalHovering] = useState(false);
  const isHovering = isHovered !== undefined ? isHovered : internalHovering;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);

  const images = gallery ? gallery.filter(item => item.type === 'image') : [];
  const primaryAsset = gallery && gallery.length > 0 ? gallery[0] : null;

  useEffect(() => {
    // Preload images for instant hover switching
    images.forEach((item) => {
      if (item.url) {
        const img = new Image();
        img.src = item.url;
      }
    });
  }, [images]);

  // Handle image cycling when card/thumbnail is hovered
  useEffect(() => {
    let interval;

    if (isHovering && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 800);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovering, images.length, primaryAsset]);

  // Handle video playing/pausing when card/thumbnail is hovered
  useEffect(() => {
    if (primaryAsset?.type === 'video' && videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 1;
      }
    }
  }, [isHovering, primaryAsset]);

  if (!primaryAsset) {
    return <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>;
  }

  if (primaryAsset.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={`${primaryAsset.url}#t=1`}
        muted
        playsInline
        loop
        onMouseEnter={() => setInternalHovering(true)}
        onMouseLeave={() => setInternalHovering(false)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
      />
    );
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setInternalHovering(true)}
      onMouseLeave={() => setInternalHovering(false)}
    >
      <img
        src={isHovering && images.length > 0 ? images[currentImageIndex]?.url || primaryAsset.url : images[0]?.url || primaryAsset.url}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '4px',
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
    </div>
  );
};

export default ProjectThumbnail;
