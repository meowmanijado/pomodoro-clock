import React from 'react';

export class Pomodoro extends React.Component {

	displayTime() {
		const minutes = Math.floor(this.props.time / 60);
		const remainderSeconds = this.props.time % 60;
		const display = `${minutes}: ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
		document.title = display;

		return display;
	}

	render() {
		const button1 = this.props.status1;
		const button2 = this.props.status2;

		return (
			<div className="display">
				<h1>{this.displayTime()}</h1>
				<button onClick={this.props.startTimer}>{button1}</button>
				<button onClick={this.props.pauseTimer}>{button2}</button>
 			</div>
		);
	};
}

export default Pomodoro;