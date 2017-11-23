import React, { Component } from 'react';
import './App.css';
import Pomodoro from './Pomodoro';
import ToDo from './ToDo';
import TodoList from './TodoList';

let pomodoro = {
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

    this.state = {pomodoro, todos: {}};

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    
  }

  timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    clearInterval(this.state.pomodoro.countdown);

    this.setState({
      pomodoro: Object.assign({}, this.state.pomodoro, {
        status1: 'Pause',
        status2: 'Stop',
        countdown: setInterval(() => {
            const secondsLeft = this.setState({pomodoro: Object.assign({}, this.state.pomodoro, {
              seconds: Math.round((then - Date.now()) / 1000),
            })});

            if (secondsLeft < 0) {
              clearInterval(this.state.pomodoro.countdown);
              return;
            }

        },1000)
      })
    });
  }

  startTimer() {

    const pomodoro = {...this.state.pomodoro}

    

    if(pomodoro.status1 === 'Pause') {
      clearTimeout(this.state.pomodoro.countdown);
      this.setState({pomodoro: Object.assign({}, this.state.pomodoro, {
        pause: true,
        status1: 'Resume',
        status2: 'Done'
      })});
    } else {
      this.timer(1500);
    }
    
  }

  reset() {
    this.setState({pomodoro});
  }

  pauseTimer() {
    clearTimeout(this.state.pomodoro.countdown);

    this.setState({pomodoro: Object.assign({}, this.state.pomodoro, {
      pause: true, status2: 'Done', timestamp: Date.now()
    })});

    if (this.state.pomodoro.status2 === 'Stop' || 'Dne') this.reset();

  }

  addTodo(todo) {
    const todos = {...this.state.todos};
    const timestamp = Date.now();
    todos[`todo-${timestamp}`] = todo;
    this.setState({todos});
  }

  render() {
    const seconds = this.state.pomodoro.seconds;
    const status1 = this.state.pomodoro.status1;
    const status2 = this.state.pomodoro.status2;
    return (
      <div className="App">
        <Pomodoro time={seconds} startTimer={this.startTimer} pauseTimer={this.pauseTimer} status1={status1} status2={status2} />
        <ToDo addTodo={this.addTodo} />
        <ul>
          {Object.keys(this.state.todos).map(key => <TodoList key={key} details={this.state.todos[key]} />)}
        </ul>
      </div>
    );
  }
}

export default App;
