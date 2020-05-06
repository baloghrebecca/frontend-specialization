import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    };

    
    handleAddButtonClicked(e) {
        e.preventDefault();
        this.props.onAddItem(this.state)
    }

    render() {
        return (
            <form>
                <input 
                id="name" 
                placeholder="Product" 
                aria-label="Product" 
                type="text" 
                value={this.state.nameValue} 
                onChange={this.handleChange} 
                />
                <input 
                id="price" 
                placeholder="Price" 
                aria-label="Price" 
                type="text" 
                value={this.state.priceValue} 
                onChange={this.handleChange} />
                <button 
                onClick={e => this.handleAddButtonClicked(e)}
                >Add Item</button>
            </form>
        );
    }
}




