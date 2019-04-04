import React, { Fragment } from 'react';
import MemoryCard from './MemoryCard';
import '../css/MemoryViewPage.css';

import { Card } from 'semantic-ui-react';

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
      <Card.Group itemsPerRow={3} id='memoryCardContainer'>
        {renderMemoryCards()}
      </Card.Group>
    </Fragment>
  );
}

export default MemoryViewPage;
