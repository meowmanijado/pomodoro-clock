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
		const isAvailable = this.props.disabled === false;

		return (
			<div className="w-full text-center pb-8">
				<h2>{this.displayTime()}</h2>
				<div>
						<button className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded-full"
							onClick={this.props.startTimer}>{button1}</button>
						<button className="button-2 bg-purple text-white font-bold py-2 px-4 rounded-full"
								disabled={!isAvailable}
								onClick={this.props.stopTimer}>{button2}</button>
				</div>
				
 			</div>
		);
	};
}

export default Pomodoro;