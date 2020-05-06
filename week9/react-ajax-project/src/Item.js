import React from 'react';

class Item extends React.Component {

    render() { 
        return ( 
        <li><strong>{this.props.name}</strong> {this.props.price} <button>Delete</button></li>
         );
    }
}
 
export default Item;