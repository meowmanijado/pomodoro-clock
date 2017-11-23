import React from 'react';

export class ToDo extends React.Component {
	constructor() {
		super();
		this.renderTodo = this.renderTodo.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	createTodo(e) {
		e.preventDefault();
		if (!this.todo.value.length) {
			return;
		}
		const todo = {
			name: this.todo.value,
			timestamp: null
		}
		this.props.addTodo(todo);
		this.todoForm.reset();
	}

	handleChange(e, key) {
		const todo = this.props.todos[key];
		const updatedTodo = {
			...todo,
			[e.target.name]: e.target.value
		}
		this.props.updateTodo(key, updatedTodo);
	}

	renderTodo(key) {
		const todo = this.props.todos[key];
		return (

			<div key={key}>
				<input type="text" name="name" value={todo.name} placeholder="Add ToDo" onChange={(e) => this.handleChange(e, key)} />
				<button onClick={() => this.props.removeTodo(key)}>Done</button>
			</div>
		)
	}

	render() {
		return (
			<div>
				<h2>Add Todo</h2>
				
				<form ref={(input) => this.todoForm = input} onSubmit={(e) => this.createTodo(e)}>
					<input type="text" placeholder="Add ToDo" ref={(input) => {this.todo = input}} />
				</form>

				{Object.keys(this.props.todos).map(this.renderTodo)}
			</div>
		)
	}
}

export default ToDo;