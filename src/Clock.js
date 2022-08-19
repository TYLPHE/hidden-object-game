import './styles/Clock.css';
import helper from './helper';

function Clock(props) {
  return (
      <div className='clock'>
        {helper.convertSeconds(props.time)}
      </div>
  );
}

export default Clock;
