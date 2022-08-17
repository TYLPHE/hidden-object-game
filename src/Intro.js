import './styles/Intro.css';
import crew from './images/crew.png';

function Intro(props) {
  return (
    <div className="intro">
      Find Waldo and his friends!
      <img alt='picture of waldo and friends' src={crew} />
      <button className='start' onClick={() => props.setSeenIntro(true)}>
        Start
      </button>
    </div>
  )
}

export default Intro;
