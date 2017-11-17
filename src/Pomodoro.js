import React from 'react';

export class Pomodoro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			session: 25,
			startSession: true
		};

		this.startPomodoro = this.startPomodoro.bind(this);
	}

	startPomodoro(e) {

		if (this.state.startSession) {
			const counter = setInterval(() => {
				this.setState({session: this.state.session - 1})

				if (this.state.session <= 0) {
					clearInterval(counter);
					return;
				}
			}, 1000);
		}
	}

	render() {
		return (
			<div>
				<p>{this.state.session}</p>
				<button onClick={this.startPomodoro}>Start</button>
 			</div>
		);
	};
}

export default Pomodoro;