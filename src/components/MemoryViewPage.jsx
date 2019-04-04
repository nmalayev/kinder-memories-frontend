import React from 'react';
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
    <Card.Group itemsPerRow={4} id='memoryCardContainer'>
      {renderMemoryCards()}
    </Card.Group>
  );
}

export default MemoryViewPage;
