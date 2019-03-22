import React from 'react';

function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/FlNHeNiz_PU?autoplay=1&loop=1'
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      />
    </div>
  );
}

export default HomePage;
