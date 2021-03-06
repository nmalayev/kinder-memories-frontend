import React from 'react';
import '../css/AccessDenied.css';

function AccessDenied(props) {
  const errorMessage = () => {
    if (props.history.location.pathname === '/memories') {
      return 'view all memories.';
    }
    if (props.history.location.pathname === '/timeline') {
      return 'view the timeline.';
    }
    if (props.history.location.pathname === '/new-memory') {
      return 'post a new memory.';
    }
  };

  return (
    <div id='access-denied'>
      <h1 id='access-denied-msg'>Please log in to {errorMessage()}</h1>
      <br />
      <iframe
        title='homepage-gif'
        src='https://giphy.com/embed/WAInq2ktLbAuQ'
        width='700'
        height='700'
        frameBorder='0'
        className='giphy-embed'
        style={{ pointerEvents: 'none' }}
        allowFullScreen
      />
    </div>
  );
}

export default AccessDenied;
