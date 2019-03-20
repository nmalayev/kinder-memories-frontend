import React from 'react';
import MemoryCard from './MemoryCard';
import '../css/MemoryViewPage.css';

import { Card } from 'semantic-ui-react';

function MemoryViewPage(props) {
  const { searchQuery, memories } = props;
  const renderMemoryCards = () => {
    if (searchQuery) {
      return memories
        .filter(mem =>
          mem.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(mem => {
          return <MemoryCard key={mem.id} memory={mem} />;
        });
    }

    return memories.map(mem => {
      return <MemoryCard key={mem.id} memory={mem} />;
    });
  };

  return (
    <div>
      <Card.Group itemsPerRow={4} id='memoryCardContainer'>
        {renderMemoryCards()}
      </Card.Group>
    </div>
  );
}

export default MemoryViewPage;
