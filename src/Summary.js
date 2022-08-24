import { useEffect } from 'react';
import './styles/Summary.css';
import helper from './helper';

function Summary(props) {
  useEffect(() => {
    props.setTimeToggle(false)
  })

  return (
    <div className='intro-container'>
      <div>
        Complete!
      </div>
      <div>
        {helper.convertSeconds(props.time)}
      </div>
      <div
        className='waldo-window'
        style={
          {
            backgroundImage: `url( ${props.url} )`,
            backgroundPositionX: props.bgX,
            backgroundPositionY: props.bgY
          }
        }
      />
    </div>
  );
}

export default Summary;
