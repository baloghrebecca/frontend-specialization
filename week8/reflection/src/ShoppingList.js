import React from 'react';
import items from './items.json';
import ShoppingItem from './ShoppingItem';

class ShoppingList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			itemList: items,
		};
	}

	handleDelete(index) {
		this.setState(prevState => {
			const filteredItems = prevState.itemList.filter((item, i) => i !== index);
			return {
				itemList: filteredItems
			};
		});
	}
	render() {
		const itemListMapped = this.state.itemList.map((item, index) => {
			return <ShoppingItem key={item.id} name={item.name} price={item.price} onDelete={() => this.handleDelete(index)} />
		});

		const noItemsMsg = itemListMapped.length > 0 ? itemListMapped : "No items in the list!"

		return (<ul>
			{noItemsMsg}
		</ul>);
	}
}

export default ShoppingList;