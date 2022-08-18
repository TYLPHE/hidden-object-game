import './styles/Selection.css'

function Selection(props) {
  return (
    <div 
      className='selection zoomed center'
      style={
        {
          top: props.top,
          left: props.left,
          backgroundImage: props.bgUrl,
          backgroundPositionX: props.bgPosX,
          backgroundPositionY: props.bgPosY,
        }
      }
    >
      <div className='bubble selection-cancel center' />
    </div>
  )
}

export default Selection;
