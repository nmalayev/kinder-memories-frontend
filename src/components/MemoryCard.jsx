import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

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
        <video width='420'>
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

    if (years > 0 && years < 2) {
      return <h3>{years + ' Year, ' + months + ' Months '}</h3>;
    } else if (years > 0 && years > 2) {
      return <h3>{years + ' Years, ' + months + ' Months '}</h3>;
    } else {
      return <h3>{months + ' Months '}</h3>;
    }
  };

  return (
    <Card raised>
      <div>
        <div>
          {calcMemoryAge()}
          {moment(props.memory.memory_date).format('MMM Do YYYY')}
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
