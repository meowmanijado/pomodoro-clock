import React from 'react';

export class Pomodoro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			session: 25,
			timer: 25 * 60,
			startSession: true,
			pauseSession: false
		};

		this.startPomodoro = this.startPomodoro.bind(this);
	}

	tick() {

		this.setState({timer: this.state.timer - 1});

		if (this.state.timer <= 0) clearInterval(this.counter);

	}

	startPomodoro() {

		if (this.state.startSession) this.counter = setInterval(() => this.tick(), 1000);

		if (this.state.pauseSession) {
			alert('paused');
		}
	}

	

	displayTime() {

		const mins = parseInt(this.state.timer / 60, 10),
			  secs = parseInt(this.state.timer % 60, 10);

		return `${mins} : ${secs}`;
	}

	render() {
		return (
			<div>
				<p>{this.state.timer}</p>
				<p>Current time: {this.displayTime()} </p>
				<button onClick={this.startPomodoro}>Start</button>
				<button onClick={this.pausePomodoro}>Pause</button>
 			</div>
		);
	};
}

export default Pomodoro;