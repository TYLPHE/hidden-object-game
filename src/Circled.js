import './styles/Circled.css'

function Circled(props) {
  function WaldoCircle() {
    if (props.waldoCircleDisp) {
      return (
        <div
          className='circled'
          style={
            {
              left: props.waldoCircleCoordX,
              top: props.waldoCircleCoordY,
            }
          }
        >
        </div>
      ) 
    }
  }
  function WendaCircle() {
    if (props.wendaCircleDisp) {
      return (
        <div
          className='circled'
          style={
            {
              left: props.wendaCircleCoordX,
              top: props.wendaCircleCoordY,
            }
          }
        >
        </div>
      ) 
    }
  }
  function WizardCircle() {
    if (props.wizardCircleDisp) {
      return (
        <div
          className='circled'
          style={
            {
              left: props.wizardCircleCoordX,
              top: props.wizardCircleCoordY,
            }
          }
        >
        </div>
      ) 
    }
  }
  function OdlawCircle() {
    if (props.odlawCircleDisp) {
      return (
        <div
          className='circled'
          style={
            {
              left: props.odlawCircleCoordX,
              top: props.odlawCircleCoordY,
            }
          }
        >
        </div>
      ) 
    }
  }
  return (
    <div>
      <WaldoCircle />
      <WendaCircle />
      <WizardCircle />
      <OdlawCircle />
    </div>
  );
}

export default Circled
