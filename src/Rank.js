import { useEffect, useState } from 'react';
import helper from './helper';
import './styles/Rank.css'

function Rank(props) {
  const [scores, setScores] = useState([]);
  const [playerRank, setPlayerRank] = useState(0);

  useEffect(() => {
    helper.getScores(props.map).then((value) => setScores(value));
  }, [props.map]);

  useEffect(() => {
    for (let i = 0; i < scores.length; i += 1) {
      if (scores[i][0] === props.rankId) {
        setPlayerRank(i + 1);
      }
    }
  }, [props.rankId, scores])
  
  function TimesList() {
    const arr = [];
    for (let i = 0; i < scores.length; i += 1) {
      const child = [];
      if (scores[i][0] === props.rankId) {
        child.push(
          <tr key={i} className='my-rank'>
            <td className='table-rank'>{i+1}</td>
            <td className='table-name'>{scores[i][1]}</td>
            <td className='table-time'>{helper.convertSeconds(scores[i][2])}</td>
          </tr>
        )
      } else {
        child.push(
          <tr key={i}>
            <td className='table-rank'>{i+1}</td>
            <td className='table-name'>{scores[i][1]}</td>
            <td className='table-time'>{helper.convertSeconds(scores[i][2])}</td>
          </tr>
        )
      }
      arr.push(child);
    }

    return arr;
  }

  function MyRank() {
    return (
      <div className='my-rank'>{playerRank}</div>
    );
  }
  return (
    <div className='rank-container'>
      <div className='title'>Ranking</div>
      <div className='rank-reset-cont'>
        <div className='myRank-cont' >
          <div className='my-rank'>Your Rank:&nbsp;</div>
          <MyRank />
        </div>
        <button onClick={() => window.location.reload()}>New Game</button>

      </div>
      <table>
        <thead>
          <tr>
            <th className='rank-heading'>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <TimesList />
        </tbody>
      </table>
    </div>
  )
}

export default Rank;
