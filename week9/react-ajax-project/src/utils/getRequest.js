export function getItems(callback) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/items");
    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
        const items = JSON.parse(request.responseText);
        callback(items, null)
        } else {
            return "Oopsie something went wrong!"
        }
    }

    request.onerror = () => {
        return "Something went wrong. Please try again."
    }

    request.send();
}