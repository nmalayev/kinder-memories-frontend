import React from 'react';
import moment from 'moment';
import logo from '../assets/logo.png';

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

  const classNameRender = () => {
    if (props.memory.post_type === 'photo') {
      return 'cd-timeline__img--photo';
    } else if (props.memory.post_type === 'letter') {
      return 'cd-timeline__img--letter';
    } else if (props.memory.post_type === 'video') {
      return 'cd-timeline__img--video';
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
    <div className='cd-timeline__block js-cd-block' id={props.memory.id}>
      <div className={`cd-timeline__img ${classNameRender()} js-cd-img`}>
        <img src={logo} alt='' />
      </div>

      <div className='cd-timeline__content js-cd-content'>
        {/* <h4>{props.memory.post_type}</h4>
        <h4>{props.memory.user.relation}</h4> */}

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
          {/* <a href='#0' className='cd-timeline__read-more'>
            Read more
          </a> */}
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
