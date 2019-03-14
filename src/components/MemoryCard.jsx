import React from 'react';
import moment from 'moment';

function MemoryCard(props) {
  console.log('MemoryCard', props);
  const memoryTypeRender = () => {
    if (props.memory.post_type === 'photo') {
      return <img src={props.memory.photo} alt='photo' />;
    } else if (props.memory.post_type === 'letter') {
      return <p>{props.memory.letter}</p>;
    } else if (props.memory.post_type === 'video') {
      return (
        <video width='420'>
          <source src={props.memory.video} type='video/mp4' />
          {/* <source src='mov_bbb.ogg' type='video/ogg' /> */}
        </video>
      );
    }
  };

  return (
    <div className='cd-timeline__block js-cd-block'>
      <div className='cd-timeline__img cd-timeline__img--picture js-cd-img'>
        <img src='img/cd-icon-picture.svg' alt='Picture' />
      </div>

      <div className='cd-timeline__content js-cd-content'>
        <div>
          <h3>Timeline Date</h3>
          <h3>Timeline Age</h3>
        </div>
        <hr />
        <h2>{props.memory.title}</h2>
        <div>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            optio, dolorum provident rerum aut hic quasi placeat iure tempora
            laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis
            qui ut.
          </p> */}
          {memoryTypeRender()}
        </div>

        <hr />
        <div>
          <h4>
            Posted by {props.memory.user.name} on{' '}
            {moment(props.memory.created_at).format('MMMM Do YYYY')}
          </h4>
          <a href='#0' className='cd-timeline__read-more'>
            Read more
          </a>
        </div>
        <span className='cd-timeline__date'>Jan 14</span>
      </div>
    </div>
  );
}

export default MemoryCard;

// t.string "post_type"
// t.string "title"
// t.text "description"
// t.text "letter", default: ""
// t.bigint "timeline_id"
// t.string "poster"
