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
  status2: 'Stop',
  disabled: true
}

class App extends Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.editTodo = this.editTodo.bind(this);

    this.state = {pomodoro, todos: {}};
  }

  timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    clearInterval(this.state.pomodoro.countdown);

    this.setState({
      pomodoro: Object.assign({}, this.state.pomodoro, {
        status1: 'Pause',
        status2: 'Stop',
        disabled: false,
        countdown: setInterval(() => {
                this.setState({
                pomodoro: Object.assign({}, 
                this.state.pomodoro, {
                seconds: Math.round((then - Date.now()) / 1000),
            })});

            if (this.state.pomodoro.seconds <= 0) {
              clearInterval(this.state.pomodoro.countdown);
              this.reset();
              return;
            }

        },1000)
      })
    });
  }

  startTimer() {

    const pomodoro = {...this.state.pomodoro}

    

    if(pomodoro.status1 === 'Pause') {

      clearInterval(this.state.pomodoro.countdown);

      this.setState({pomodoro: Object.assign({}, this.state.pomodoro, {
        pause: true,
        status1: 'Resume',
        status2: 'Done'
      })});
    } else if (pomodoro.status1 === 'Resume') {
      this.timer(this.state.pomodoro.seconds);
    } else {
      this.timer(1500);
    }
    
  }

  stopTimer() {
    if (this.state.pomodoro.status2 === 'Stop' || 'Done') {
      this.reset();
      clearInterval(this.state.pomodoro.countdown);
    }
  }

  reset() {
    this.setState({pomodoro});
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`todo-${Date.now()}`, JSON.stringify(nextState.details));
  }

  addTodo(todo) {
    const todos = {...this.state.todos};
    const timestamp = Date.now();
    todos[`todo-${timestamp}`] = todo;
    this.setState({todos});
  }

  updateTodo(key, updatedTodo) {
    const todos = {...this.state.todos};
    todos[key] = updatedTodo;
    this.setState({todos});
  }

  editTodo(key, enableEdit) {
    const todos = {...this.state.todos};
    todos[key] = enableEdit;
    this.setState({todos});
  }

  removeTodo(key) {
    const todos = {...this.state.todos};
    delete todos[key]; // todos[key] = null;
    this.setState({todos});
  }

  render() {
    const seconds = this.state.pomodoro.seconds;
    const status1 = this.state.pomodoro.status1;
    const status2 = this.state.pomodoro.status2;
    const disabled = this.state.pomodoro.disabled;
    return (
      <div className="grid mx-auto md pt-8">
        <h2 className="mb-4 text-center">Pomodoro Timer</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Pomodoro time={seconds} startTimer={this.startTimer} stopTimer={this.stopTimer} status1={status1} status2={status2} disabled={disabled} />
        <ToDo 
          addTodo={this.addTodo} 
          todos={this.state.todos} 
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo} />
        <ul className="list-reset hidden">
          {Object.keys(this.state.todos).map(key => <TodoList key={key} details={this.state.todos[key]} editing={this.editTodo} />)}
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
