export function postRequest(callback, item) {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/items");
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
        console.log(request.responseText)
        callback(item);
        } else {
        console.log("It didnt")
        }
    }
    request.onerror = () => {
        console.log("Error")
    }

    request.send(JSON.stringify(item));
}