import React from 'react';
import MemoryCard from './MemoryCard';

function MemoryViewPage(props) {
  const renderMemoryCards = () => {
    return props.memories.map(mem => {
      return <MemoryCard key={mem.id} memory={mem} />;
    });
  };

  return <div>{renderMemoryCards()}</div>;
}

export default MemoryViewPage;
