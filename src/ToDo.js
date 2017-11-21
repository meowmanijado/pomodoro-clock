import React from 'react';

export class ToDo extends React.Component {
	addTodo(e) {
		e.preventDefault();
		const todo = { todo: this.todo.value }
	}

	render() {
		return (
			<form onSubmit={(e) => this.addTodo(e)}>
				<input type="text" placeholder="Add ToDo" ref={(input) => {this.todo = input}} />
			</form> 
		)
	}
}

export default ToDo;