import React from 'react';

function MemoryCard() {
  return (
    <div className='cd-timeline__block js-cd-block'>
      <div className='cd-timeline__img cd-timeline__img--picture js-cd-img'>
        <img src='img/cd-icon-picture.svg' alt='Picture' />
      </div>

      <div className='cd-timeline__content js-cd-content'>
        <h2>Title of section 1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
          optio, dolorum provident rerum aut hic quasi placeat iure tempora
          laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui
          ut.
        </p>
        <a href='#0' className='cd-timeline__read-more'>
          Read more
        </a>
        <span className='cd-timeline__date'>Jan 14</span>
      </div>
    </div>
  );
}

export default MemoryCard;
