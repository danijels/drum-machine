import * as React from 'react'
import Display from './display'

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
          info: ''
        }
        //References to each of the audio elements so that I can play them from my event handlers.
        //https://reactjs.org/docs/refs-and-the-dom.html
        this.QSound = React.createRef();
        this.WSound = React.createRef();
        this.ESound = React.createRef();
        this.ASound = React.createRef();
        this.SSound = React.createRef();
        this.DSound = React.createRef();
        this.ZSound = React.createRef();
        this.XSound = React.createRef();
        this.CSound = React.createRef();
        
        this.displayInfo = this.displayInfo.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.keyClass = this.keyClass.bind(this);
        this.renderKeyElements = this.renderKeyElements.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }
    handleClick(e, key) {
        //First it checks where the info about the key is coming from
        const field = key ? key : e.target.id;
        const target = `${field}Sound`;
        //Selects the correct audio element
        const audio = this[target].current;

        //The .volume property of HTMLMediaElement accepts numbers from 0.0 to 1.0
        audio.volume = this.props.volume / 100;
        audio.play();

        this.displayInfo(field);
    }
    handleKeyDown(e) {
    //If the component gets the info from its parent that it's off the keys will not react
        if (this.props.power) {
            if (Object.keys(this.props.bank).includes(e.key.toUpperCase())) {
                //this.state.key is used later on to decide which .drum-pad gets the class of 'active' 
                //so that it appears being pressed (see keyClass())
                this.setState({ key: e.key.toUpperCase() }); 
                //null is being passed to the handler manually since there is no event
                this.handleClick(null, e.key.toUpperCase());
            }
        }
    }
    handleKeyUp(e) {
        //this.state.key is reset and the pressed key loses the .active class (see keyClass())
        this.setState({ key: '' });
    }
    keyClass(id) {
        return this.state.key === id ? 'drum-pad active' : 'drum-pad'
    }
    displayInfo(key) {
        const bank = this.props.bank;
        const info = bank[key].name;
        this.setState({ info });
    }
    renderKeyElements() {   
        const bank = this.props.bank;
        const keys = Object.keys(bank);
        //For each key of the bank object a drum pad div with an audio element inside of it is built
        return keys.map(key => {
            return <div key={key} className={this.keyClass(key)} id={key}>
               {key}
                <audio 
                  class='clip' 
                  id={key} 
                  ref={this[`${key}Sound`]}
                  src={bank[key].url}
                />
            </div>                
        });
    }
    render() {    
        return (
            <div>
                <div 
                  id='keyboard' 
                  class={this.props.class}
                  onClick={this.handleClick}
                >
                    {this.renderKeyElements()}                    
                </div>
                <Display 
                  info={this.state.info} 
                  id='display' 
                />
            </div>
        )
    }
}

export default Keyboard
