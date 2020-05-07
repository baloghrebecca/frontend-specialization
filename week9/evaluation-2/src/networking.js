export function getItems(completionHandler) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8081/items");
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            const itemList = JSON.parse(request.responseText);
            completionHandler(itemList, null)
        }
        else {
            completionHandler(null, `Failed to load items. Problem: ${request.responseText}. Please try again.`)
        }
    };
    request.onerror = () => {
        completionHandler(null, `Failed to connect to the server. Please try again.`)
    };
    request.send();
}

export function addItem(item, completionHandler) {
    const postRequest = new XMLHttpRequest();
    postRequest.open("POST", "http://localhost:8081/items");
    postRequest.setRequestHeader("Content-Type", "application/json");
    postRequest.onload = () => {
        if (postRequest.status >= 200 && postRequest.status < 400) {
            const itemList = JSON.parse(postRequest.responseText);
            completionHandler(itemList, null)
        } else {
            completionHandler(null, 'Error adding item. Please try again!')
        }
    }
    postRequest.onerror = () => {
        completionHandler(null, 'Server error. Please try again!')
    };
    postRequest.send(JSON.stringify(item));
}

export function deleteItem(item, completionHandler) {
    const deleteRequest = new XMLHttpRequest();
    deleteRequest.open("DELETE", `http://localhost:8081/items/${item.id}`)
    deleteRequest.onload = () => {
        if (deleteRequest.status >= 200 && deleteRequest.status < 400) {
            completionHandler(item, null)
        } else {
            completionHandler(null, 'Error deleting item. Please try again.')
        }
    }
    deleteRequest.onerror = () => {
        completionHandler(null, 'Server error. Please try again!')
    };
    deleteRequest.send()
}