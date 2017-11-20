import React from 'react';

export class Pomodoro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: 25 * 60
		};

		this.startTimer = this.startTimer.bind(this);
	}

	displayTimer(seconds) {
		const minutes = Math.floor(this.state.seconds / 60);
		const remainderSeconds = this.state.seconds % 60;
		const display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
		document.title = display;
		return display;
	}


	timer(seconds) {
		
		clearInterval(countdown);

		let countdown;
		const now = Date.now();
		const then = now + this.state.seconds * 1000;
		

		this.displayTimer(seconds);

		countdown = setInterval(() => {
			const secondsLeft = this.setState({seconds: Math.round((then - Date.now()) / 1000)});
			
			if (secondsLeft < 0) {
				clearInterval(countdown);
				return;
			}
			this.displayTimer(secondsLeft);
		}, 1000);

		
	}

	startTimer() {
		const seconds = parseInt(this.displayTimer, 10);
		this.timer(seconds);
	}

	render() {
		return (
			<div className="display">
				<h1>{this.displayTimer(this.state.seconds)}</h1>
				<button onClick={this.startTimer}>Start</button>
 			</div>
		);
	};
}

export default Pomodoro;