import { useState, useEffect } from 'react';

const ProjectThumbnail = ({ gallery, title }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = gallery ? gallery.filter(item => item.type === 'image') : [];

  const primaryAsset = gallery && gallery.length > 0 ? gallery[0] : null;

  useEffect(() => {
    let interval;

    if (isHovering && images.length > 1 && primaryAsset.type !== 'video') {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1200);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovering, images.length, primaryAsset]);


  if (!primaryAsset) {
    return <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>;
  }

  if (primaryAsset.type === 'video') {
    return (
      <video
        src={`${primaryAsset.url}#t=1`}
        muted
        playsInline
        loop
        onMouseOver={e => e.target.play()}
        onMouseOut={e => { e.target.pause(); e.target.currentTime = 1; }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
      />
    );
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={isHovering ? images[currentImageIndex].url : images[0].url}
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
