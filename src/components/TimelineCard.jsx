import React from 'react';
import moment from 'moment';

function TimelineCard(props) {
  const memoryTypeRender = () => {
    if (props.memory.post_type === 'photo') {
      return (
        <img src={'http://localhost:3001' + props.memory.file_url} alt='' />
      );
    } else if (props.memory.post_type === 'letter') {
      return <p>{props.memory.letter}</p>;
    } else if (props.memory.post_type === 'video') {
      return (
        <video controls={true} width='500'>
          <source
            src={'http://localhost:3001' + props.memory.file_url}
            type='video/mp4'
          />
          <source
            src={'http://localhost:3001' + props.memory.file_url}
            type='video/ogg'
          />
        </video>
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
      return <h3>{years + ' Year, ' + months + ' Months '}</h3>;
    } else if (years > 1) {
      return <h3>{years + ' Years, ' + months + ' Months '}</h3>;
    } else {
      return <h3>{months + ' Months '}</h3>;
    }
  };

  return (
    <div className='cd-timeline__block js-cd-block' id={props.memory.id}>
      <div className='cd-timeline__img cd-timeline__img--picture js-cd-img'>
        <img src='img/cd-icon-picture.svg' alt='' />
      </div>

      <div className='cd-timeline__content js-cd-content'>
        <div>{calcMemoryAge()}</div>
        <hr />
        <h2>{props.memory.title}</h2>
        <p>{props.memory.description}</p>

        <div>{memoryTypeRender()}</div>
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
        <span className='cd-timeline__date'>
          {/* utcOffset below adds 1 hour to time that is sent to API because default is midnight, and moment.js parses it as day before on frontend. */}
          {moment(props.memory.memory_date)
            .utcOffset('+0100')
            .format('MMM Do YYYY')}
        </span>
      </div>
    </div>
  );
}

export default TimelineCard;
