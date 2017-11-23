import React from 'react';
import TodoList from './TodoList';

export class ToDo extends React.Component {
	createTodo(e) {
		e.preventDefault();
		const todo = {
			name: this.todo.value
		}
		this.props.addTodo(todo);
		this.todoForm.reset();
		console.log(todo);
	}

	render() {
		return (
			<div>
				<form ref={(input) => this.todoForm = input} onSubmit={(e) => this.createTodo(e)}>
					<input type="text" placeholder="Add ToDo" ref={(input) => {this.todo = input}} />
				</form>
				<TodoList />
			</div>
		)
	}
}

export default ToDo;