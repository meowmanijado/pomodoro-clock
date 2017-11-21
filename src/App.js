import React, { Component } from 'react';
import './App.css';
import Pomodoro from './Pomodoro';
import ToDo from './ToDo';

const initialState = {
  seconds: 1500, 
  countdown: 0, 
  pause: false, 
  timestamp: null, 
  status1: 'Start', 
  status2: 'Stop'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.state = {initialState, todos: {}};

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    
  }

  timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    clearInterval(this.state.countdown);
    this.setState({pause: false, status1: 'Resume', status2: 'Pause'});

    this.setState({countdown: setInterval(() => {
        const secondsLeft = this.setState({seconds: Math.round((then - Date.now()) / 1000)});
        
        if (secondsLeft < 0) {
          clearInterval(this.state.countdown);
          return;
        }
      }, 1000)});
  }

  startTimer() {
    this.timer(this.state.seconds);
  }

  reset() {
    this.setState(initialState);
  }

  pauseTimer() {
    clearTimeout(this.state.countdown);
    this.setState({pause: true, status2: 'Done', timestamp: Date.now()});

    if (this.state.status2 === 'Done') this.reset();
  }

  addTodo(todo) {
    const todos = {...this.state.todos};
    const timestamp = Date.now();
    todos[`todo-${timestamp}`] = todo;
    this.setState({todos});
  }

  render() {
    return (
      <div className="App">
        <Pomodoro time={this.state.seconds} />
        <button onClick={this.startTimer}>{this.state.status1}</button>
        <button onClick={this.pauseTimer} disabled={this.state.status1==='Start'}>
               {this.state.status2}
        </button>
        <ToDo />
      </div>
    );
  }
}

export default App;
