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
			<div className="w-full text-center pb-8">
				<h2>{this.displayTime()}</h2>
				<div className="md:flex md:items-center">
					<div className="md:w-2/3">
						<button className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded-full"
							onClick={this.props.startTimer}>{button1}</button>
						<button className="bg-purple text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed"
								onClick={this.props.pauseTimer}>{button2}</button>
					</div>
				</div>
				
 			</div>
		);
	};
}

export default Pomodoro;