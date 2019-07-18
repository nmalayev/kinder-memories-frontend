import React, { Fragment } from 'react';
import MemoryCard from './MemoryCard';
import '../css/MemoryViewPage.css';

function MemoryViewPage(props) {
  const { memories } = props;

  const renderMemoryCards = () => {
    return memories.map(mem => {
      return <MemoryCard key={mem.id} memory={mem} />;
    });
  };

  return (
    <Fragment>
      <h1 id='timeline-name'>{props.childName + "'s Timeline Memories"}</h1>

      {/* reference code example of fluid cards here: https://semantic-ui.com/views/card.html#fluid-card */}
      <div className='ui four column grid'>{renderMemoryCards()}</div>
    </Fragment>
  );
}

export default MemoryViewPage;
