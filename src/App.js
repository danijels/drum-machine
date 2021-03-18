import { Component } from 'react'
import './App.scss';
import smoothPiano from './smoothPiano'
import heater from './heater'

import Keyboard from './components/keyboard'
import Display from './components/display'
import Switch from './components/switch'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            power: false,
            bank: 'Smooth Piano',
            info: 'Machine turned OFF',
            volume: 25
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleVolChange = this.handleVolChange.bind(this);
    }
    handleChange(e) {
        //Handles change for the switches, in this case the power and the bank keys
        const bank = this.state.bank;
    
        if (e.target.id === 'power') {
            const power = this.state.power;
            let info;
      
            if (power) info = 'Machine turned OFF';
            else info = `Vol: ${this.state.volume}, ${bank}`;

            this.setState({
                power: !power,
                info
            });
        } else {
            const newBank = bank === 'Smooth Piano' ? 'Heater' : 'Smooth Piano';
            this.setState({
                bank: newBank,
                info: `Vol: ${this.state.volume}, ${newBank}`
            });
        }
    }
    handleVolChange(e) {
        this.setState({ 
            volume: e.target.value,
            info: `Vol: ${e.target.value}, ${this.state.bank}`
        });
    }
    render() {
        const on = this.state.power;
        const volume = this.state.volume;
        //.off decides if the element is responsive to pointer-events or not
        const resp = on ? '' : 'off';
        const bankObject = this.state.bank === 'Smooth Piano' ? smoothPiano : heater;
    
        return (
            <div id='drum-machine'>
                <Keyboard 
                  power={on}
                  bank={bankObject}
                  class={resp} 
                  volume={volume}
                />
                <div id='controls'>
                    <Switch 
                      label='Power' 
                      id='power'
                      disabled={false}
                      handleChange={this.handleChange}
                    />
                    <Display info={this.state.info} />
                    <input 
                      aria-label='volume'
                      type='range' 
                      class={'volume ' + resp}
                      min='0'
                      max='100'
                      step='1'
                      value={volume}
                      onChange={this.handleVolChange}
                    />
                    <Switch 
                      label='Bank' 
                      id='bank'
                      disabled={on ? false : true}
                      handleChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default App;
