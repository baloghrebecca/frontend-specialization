import React from 'react'

export default class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleInput(event){
        this.setState({ 
            [event.target.id]: event.target.value 
        });
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.onAdd(this.state);
    }


    render() {
        const titleValue = this.state.title;
        return (
            <>
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    aria-label="Title"
                    value={titleValue}
                    onChange={this.handleInput} 
                    disabled={this.props.disabled}
                    />
                <button
                onClick={this.handleAdd} 
                disabled={this.props.disabled}
                >Add to List</button>
            </>
        )
    }
}