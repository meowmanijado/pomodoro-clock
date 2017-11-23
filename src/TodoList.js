import React from 'react';

export class TodoList extends React.Component {

	render() {
		return (
			<li>{this.props.details.name}</li>
		)
	}
}

export default TodoList;