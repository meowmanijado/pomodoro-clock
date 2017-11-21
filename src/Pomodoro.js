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
		return (
			<div className="display">
				<h1>{this.displayTime()}</h1>
 			</div>
		);
	};
}

export default Pomodoro;