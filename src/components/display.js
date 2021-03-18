//Id is passed in case a Display instance needs some special styling
//Also one of the displays should have the id of display for one of the tests to pass
const Display = (props) => (
  <p class='sound-info' id={props.id}>{props.info}</p>
)

export default Display