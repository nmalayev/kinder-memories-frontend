import React from 'react';
import backgroundVideo from '../baby_stock_video.mp4';

function HomePage() {
  return (
    <div>
      <video loop autoplay='autoplay'>
        <source src={backgroundVideo} type='video/mp4' />
        <source src={backgroundVideo} type='video/ogg' />
      </video>
    </div>
  );
}

export default HomePage;
