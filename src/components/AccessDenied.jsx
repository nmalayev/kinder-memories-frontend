import React from 'react';

function AccessDenied(props) {
  console.log(props.history.location.pathname);

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
    <div>
      <h1>Please log in to {errorMessage()}</h1>
      <br />
      <iframe
        src='https://giphy.com/embed/WAInq2ktLbAuQ'
        width='480'
        height='459'
        frameBorder='0'
        className='giphy-embed'
        allowFullScreen
      />
      <p>
        <a href='https://giphy.com/gifs/computer-vintage-technology-WAInq2ktLbAuQ'>
          via GIPHY
        </a>
      </p>
    </div>
  );
}

export default AccessDenied;
