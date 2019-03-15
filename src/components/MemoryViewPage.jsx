import React from 'react';
import MemoryCard from './MemoryCard';

import { Card } from 'semantic-ui-react';

function MemoryViewPage(props) {
  const renderMemoryCards = () => {
    return props.memories.map(mem => {
      return <MemoryCard key={mem.id} memory={mem} />;
    });
  };

  return (
    <Card.Group itemsPerRow={4} className='memoryCardContainer'>
      {renderMemoryCards()}
    </Card.Group>
  );
}

export default MemoryViewPage;
