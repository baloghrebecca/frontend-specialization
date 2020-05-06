import React from 'react';
import Item from './Item.js';
import { getItems } from './utils/getRequest.js'
import Form from './Form.js'
import { postRequest } from './utils/postRequest.js'

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: [],
            isClicked: false
        }
        this.completionHandler.bind(this);
        this.addItem.bind(this);
        this.callbackFunction.bind(this)
    }


    //we need to bind it, in order to be able to pass in the 'this' into our function
    completionHandler = (itemsList, item) => {
        this.setState({
            items: itemsList,
        })
    };

    callbackFunction = (item) => {
        this.setState((prevState) => { //instead of an object, here setState receives a function
            const originalArray = prevState.items.slice();
            const addedArray = originalArray.concat(item);
            return {
                items: addedArray,
            };
        })
    };

    addItem = (item) => {

        postRequest(this.callbackFunction, item);
        console.log(this.state.items)
        console.log(item)
    };


    componentDidMount() {
        getItems(this.completionHandler);
    }


    render() {
        console.log(this.state.items);
        const itemList = this.state.items;
        const renderedList = itemList.map(item => {
            return <Item
                key={item.id}
                name={item.name}
                price={item.price}
            />
        });
        return (
            <>
                <ul>
                    {renderedList}
                </ul>
                <Form
                    onAddItem={(item) => this.addItem(item)}
                />
            </>
        )
    }
}

export default ItemList;