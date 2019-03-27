import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import moment from 'moment';
import 'moment-timezone';

function MemoryCard(props) {
  const memoryTypeRender = () => {
    if (props.memory.post_type === 'photo') {
      return (
        <div className='timeline-card-photo'>
          <img src={'http://localhost:3001' + props.memory.file_url} alt='' />
        </div>
      );
    } else if (props.memory.post_type === 'letter') {
      return (
        <div className='timeline-card-letter'>
          <p className='timeline-letter'>{props.memory.letter}</p>
        </div>
      );
    } else if (props.memory.post_type === 'video') {
      return (
        <div className='timeline-card-video'>
          <video controls={true}>
            <source
              src={'http://localhost:3001' + props.memory.file_url}
              type='video/mp4'
            />
            <source
              src={'http://localhost:3001' + props.memory.file_url}
              type='video/ogg'
            />
          </video>
        </div>
      );
    }
  };

  const timelineNodeIconRender = () => {
    if (props.memory.post_type === 'photo') {
      return (
        <div className='cd-timeline__img cd-timeline__img--photo js-cd-img'>
          <Icon name='camera retro' inverted size='big' />
        </div>
      );
    } else if (props.memory.post_type === 'letter') {
      return (
        <div className='cd-timeline__img cd-timeline__img--letter js-cd-img'>
          <Icon name='edit outline icon' inverted size='big' />
        </div>
      );
    } else if (props.memory.post_type === 'video') {
      return (
        <div className='cd-timeline__img cd-timeline__img--video js-cd-img'>
          <Icon name='video icon' inverted size='big' />
        </div>
      );
    }
  };

  const calcMemoryAge = () => {
    let memoryDate = moment(props.memory.memory_date);
    let birthday = moment(props.memory.timeline.birthday);

    let years = memoryDate.diff(birthday, 'year');
    birthday.add(years, 'years');

    let months = memoryDate.diff(birthday, 'months');
    birthday.add(months, 'months');

    if (years === 1) {
      return <h4>Age: {years + ' Year, ' + months + ' Months '}</h4>;
    } else if (years > 1) {
      return <h4>Age: {years + ' Years, ' + months + ' Months '}</h4>;
    } else if (years < -1) {
      return <h4>Age: {years + ' Years, ' + Math.abs(months) + ' Months '}</h4>;
    } else if (years === -1) {
      return <h4>Age: {years + ' Year, ' + Math.abs(months) + ' Months '}</h4>;
    } else {
      return <h4>Age: {months + ' Months '}</h4>;
    }
  };

  return (
    // <Card raised>
    <div className='column'>
      <div
        // className='cd-timeline__content js-cd-content card'
        style={{ width: 'auto' }}
      >
        {/* <h4>{props.memory.post_type}</h4>
        <h4>{props.memory.user.relation}</h4> */}
        <h2 className='card-title'>{props.memory.title}</h2>
        <p>{props.memory.description}</p>

        {/* {memoryTypeRender()} */}
        <div className='card-footer'>
          {calcMemoryAge()}
          <h4 className='posted-date'>
            Posted by {props.memory.user.name} on{' '}
            {moment(props.memory.created_at).format('MMMM Do YYYY')}
          </h4>
          {/* <a href='#0' className='cd-timeline__read-more'>
            Read more
          </a> */}
        </div>
      </div>
    </div>
    // </Card>
  );
}

export default MemoryCard;
