import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import 'moment-timezone';

function MemoryCard(props) {
  const memoryTypeRender = () => {
    if (props.memory.post_type === 'photo') {
      return (
        <img src={'http://localhost:3001' + props.memory.file_url} alt='' />
      );
    } else if (props.memory.post_type === 'letter') {
      return <p>{'http://localhost:3001' + props.memory.file_url}</p>;
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
    } else if (years < -1) {
      return <h3>{years + ' Years, ' + Math.abs(months) + ' Months '}</h3>;
    } else if (years === -1) {
      return <h3>{years + ' Year, ' + Math.abs(months) + ' Months '}</h3>;
    } else {
      return <h3>{months + ' Months '}</h3>;
    }
  };

  return (
    <Card raised>
      <div>
        <div>
          <h4>{props.memory.post_type}</h4>
          <h4>{props.memory.user.relation}</h4>
          {calcMemoryAge()}
          {/* utcOffset below adds 1 hour to time that is sent to API because default is midnight, and moment.js parses it as day before on frontend. */}
          {moment(props.memory.memory_date)
            .utcOffset('+0100')
            .format('MMM Do YYYY')}
        </div>
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
          <a href='#0'>Read more</a>
        </div>
      </div>
    </Card>
  );
}

export default MemoryCard;
