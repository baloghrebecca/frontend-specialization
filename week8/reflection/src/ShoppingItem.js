import React from 'react';

class ShoppingItem extends React.Component {
    render() {
      return <li><strong>{this.props.name}:</strong> {this.props.price} <button onClick={this.props.onDelete}>Delete</button></li>
    }
}

export default ShoppingItem;