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
			timestamp: Date.now(),
			editing: false,
			isCompleted: false
		}
		this.props.addTodo(todo);
		this.todoForm.reset();
	}

	handleChange(e, key) {
		const todo = this.props.todos[key];
		const updatedTodo = {
			...todo,
			[e.target.name]: e.target.value,
			timestamp: Date.now()
		}
		
		this.props.updateTodo(key, updatedTodo);
	}

	renderTodo(key) {
		const todo = this.props.todos[key];
		if (this.props.todos[key].isCompleted) {
			return (
				<div className="flex mb-2" 
					 key={key}>
					 <div className="flex-1">
						<input type="text" 
								name="name" 
								className="shadow appearance-none border rounded py-2 px-3 text-grey-darker" 
								value={todo.name} 
								placeholder="Add ToDo" 
								onChange={(e) => this.handleChange(e, key)} />
					</div>
					<div className="flex-1">
						<button onClick={() => this.props.finishTodo(key)}
							className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4">Finish</button>
					</div>
					<div className="flex-1">
						<button onClick={() => this.props.removeTodo(key)}
							className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4">Delete</button>
					</div>
				</div>
			)
		} else {
			return (
				<div className="flex mb-2 opacity-50" 
					 key={key}>

					 <div className="flex-1">
						<input type="text" 
								name="name" 
								className="shadow appearance-none border rounded py-2 px-3 text-grey-darker" 
								value={todo.name} 
								placeholder="Add ToDo" 
								onChange={(e) => this.handleChange(e, key)} />
					</div>
					<div className="flex-1">
						<button onClick={() => this.props.removeTodo(key)}
							className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4">Delete</button>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<form ref={(input) => this.todoForm = input} 
						onSubmit={(e) => this.createTodo(e)}>
					<div className="mb-4">
				   		<input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
				   				type="text" placeholder="Add ToDo" 
				   				ref={(input) => {this.todo = input}} />
				    </div>
					
				</form>

				{Object.keys(this.props.todos).map(this.renderTodo)}
			</div>
		)
	}
}

export default ToDo;