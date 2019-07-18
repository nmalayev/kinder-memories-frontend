import React from 'react';
import { Icon } from 'semantic-ui-react';
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
        <div className='letter-container'>
          <p className='memory-card-letter'>{props.memory.letter}</p>
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

  const calcMemoryAge = () => {
    // .add(1, 'days') in order to fix age calculation, otherwise, it counts 4/13 - 5/13 as 0 month instead of 1 month.
    let memoryDate = moment(props.memory.memory_date).add(1, 'days');
    let birthday = moment(props.memory.timeline.birthday);

    let years = memoryDate.diff(birthday, 'year');
    birthday.add(years, 'years');

    let months = memoryDate.diff(birthday, 'months');
    birthday.add(months, 'months');

    if (years === 1) {
      return (
        <h4 className='age'>Age: {years + ' Year, ' + months + ' Months '}</h4>
      );
    } else if (years > 1) {
      return (
        <h4 className='age'>Age: {years + ' Years, ' + months + ' Months '}</h4>
      );
    } else if (years < -1) {
      return (
        <h4 className='age'>
          Age: {years + ' Years, ' + Math.abs(months) + ' Months '}
        </h4>
      );
    } else if (years === -1) {
      return (
        <h4 className='age'>
          Age: {years + ' Year, ' + Math.abs(months) + ' Months '}
        </h4>
      );
    } else {
      return <h4 className='age'>Age: {months + ' Months '}</h4>;
    }
  };

  const timelineNodeIconRender = () => {
    if (props.memory.post_type === 'photo') {
      return <Icon size='big' name='camera retro' color='teal' />;
    } else if (props.memory.post_type === 'letter') {
      return <Icon size='big' name='edit outline' color='teal' />;
    } else if (props.memory.post_type === 'video') {
      return <Icon size='big' name='video' color='teal' />;
    }
  };

  return (
    <div className='column'>
      <div className='ui fluid raised card'>
        <div className='memory-card'>
          <div className='card-content'>
            <h2 className='card-title'>{props.memory.title}</h2>
            <p>{props.memory.description}</p>
            {memoryTypeRender()}
          </div>
          <div className='card-footer stick-to-bottom'>
            {calcMemoryAge()}
            <h4 className='posted-date'>
              Posted by {props.memory.user.name} on{' '}
              {moment(props.memory.created_at).format('MMMM Do YYYY')}
            </h4>
            <p className='memory-card-date'>
              {/* utcOffset below adds 1 hour to time that is sent to API because default is midnight, and moment.js parses it as day before on frontend. */}
              {moment(props.memory.memory_date)
                .utcOffset('+0100')
                .format('MMM Do YYYY')}
            </p>
            {timelineNodeIconRender()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
