import React from 'react';

export default class ToDoItem extends React.Component {
    render() {
        return <li><strong>{this.props.title}</strong> <button onClick={this.props.onDelete} disabled={this.props.disabled}>Delete</button></li> 
    }
}