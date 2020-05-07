import React from 'react'
import ToDoItem from './ToDoItem.js'
import AddItem from './AddItem.js'
import { getItems, addItem, deleteItem } from './networking.js'

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hasError: false,
            isInProgress: false,
            isLoading: true,
            error: "",
            isItemEmpty: false
        }
    }

    componentDidMount() {
        this.setState({
            isInProgress: true,
        });
        getItems((items, response) => {
            if (items) {
                this.setState({
                    isInProgress: false,
                    items: items,
                    isLoading: false
                });
                return;
            } else {
                this.setState({
                    isInProgress: false,
                    isLoading: false,
                    hasError: true,
                    error: response
                });
                return;
            }
        });
    }

    handleAdd(item) {
        this.setState({
            isInProgress: true,
        });

        if (item.title.length === 0) {
            this.setState({
                isItemEmpty: true,
                isInProgress: false,
            });
            return;
        }
        addItem(item, (items, response) => {
            if (items) {
                this.setState(prevState => {
                    return {
                        isItemEmpty: false,
                        isInProgress: false,
                        isLoading: false,
                        items: prevState.items.concat(items),
                    }
                })
            } else {
                this.setState({
                    isItemEmpty: false,
                    isInProgress: false,
                    isLoading: false,
                    hasError: true,
                    error: response
                });
            }
        });
    }

    handleDelete(item) {
        this.setState({
            isInProgress: true,
        });
        deleteItem(item, (response) => {
            if (response === null) {
                this.setState({
                    isInProgress: false,
                    isLoading: false,
                    hasError: true,
                    error: response
                });
            } else {
                this.setState(prevState => {
                    const filteredItems = prevState.items.filter((element) => element.id !== item.id);
                    return {
                        isInProgress: false,
                        isLoading: false,
                        items: filteredItems
                    }
                })
            }
        });

}

render() {
    //Helper Variables
    const itemListOriginal = this.state.items;
    const errorMsg = this.state.error;
    const hasError = this.state.hasError;
    const isInProgress = this.state.isInProgress;
    const isFieldEmpty = this.state.isItemEmpty;
    //Renders List with props
    const toDoList = itemListOriginal.map(item => {
        return <ToDoItem
            key={item.id}
            title={item.title}
            disabled={isInProgress}
            onDelete={() => this.handleDelete(item)}
        />
    })
    //Error/Loading helpers
    const isLoadingOrEmpty = this.state.isLoading ? "Loading items..." : "No items in list!";
    const displayListOrIsLoading = toDoList.length === 0 ? isLoadingOrEmpty : toDoList;

    return (
        <>
            <h1>My Todo List</h1>
            <AddItem isInProgress={this.state.isInProgress} onAdd={(item) => this.handleAdd(item)} disabled={isInProgress} isValueEmpty={(isEmpty) => this.handleAdd(isEmpty)} />
            {isFieldEmpty ? <p className="error">Please enter a title!</p> : ""}
            <ul>
                {hasError ? <p className="error">{errorMsg}</p> : displayListOrIsLoading}
            </ul>
        </>)
}

}





