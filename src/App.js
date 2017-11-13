// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import './App.css';

import StateEditor from './components/editor/State';
import type { State } from './types/State';

type Props = {};
type AppState = {states: State[]}

class App extends Component<Props, AppState> {

  constructor() {
    super();
    let states:State[] = [
      {name: 'Initial', type: 'Initial', transition: {to: 'Test'}},
      {name: 'Test', type: 'Simple', transition: {to: 'Terminal'}},
      {name: 'Terminal', type: 'Terminal'}
    ];
    this.state = {states};
  }

  onChangeBuilder = (index:number) => {
    return (value: any) => {
      return (e:any) => {
        let states = this.state.states
        _.set(states[index], value, e.target.value)
        this.setState({states})
      }
    }
  }

  addState = () => {
    let states = this.state.states;
    states.push({name: `NewState_${states.length}`, type: 'Simple', transition: {to: states[0].name}})
    this.setState({states});
  }

  render() {
    return (
      <div className="App">
        {this.state.states.map((s,i) => {
          return (
            <div key={i} style={{margin: '50px'}}>
            <StateEditor
              state={s}
              otherStates={this.state.states}
              onChangeBuilder={this.onChangeBuilder(i)}/>
            </div>
          )
        })}
        <button onClick={this.addState}> Add State </button>
      </div>
    );
  }
}

export default App;