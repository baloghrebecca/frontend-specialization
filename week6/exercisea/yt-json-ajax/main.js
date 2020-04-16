
const button = document.querySelector('#btn');
let pageCounter = 1;

button.addEventListener('click', function (event) {

    //AJAX call to download the data
    var ourRequest = new XMLHttpRequest();

    //Here we perform a method on our object. GET -> gets Data, POST -> sends Data
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

    //What should happen, when the file is downloaded
    ourRequest.onload = function () {
    // Basic error handeling 
        if (ourRequest.status >= 200 && ourRequest.status < 400) {

       

        //this logs out our JSON Data in the console
        //we can access the data we downloaded with 'responseText'
        // console.log(ourRequest.responseText);

        //we need to parse our Text into a JSON Data, so that the browser 
        //doesn't view it as plain text, but as an arry of objects
        var ourData = JSON.parse(ourRequest.responseText);
        //Her we are logging out the first object of the array
        //console.log(ourData[0]);

        renderHTML(ourData);
    } else {
        console.log ("We connected to the server, but it returned an error.");
    }


    };

    // Basic error handeling 
    ourRequest.onError = function() {
        console.log("Connection error");
    }

    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        button.classList.add('hide-me');
    }
});

function renderHTML(data) {
    const animalContainer = document.querySelector('#animal-info');
    let htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

        for (ii = 0; ii < data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            } else {
                htmlString += " and " + data[i].foods.likes[ii];
            }
        }

        htmlString += " and dislikes ";

        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            } else {
                htmlString += " and " + data[i].foods.dislikes[ii];
            }
        }

        htmlString += ".</p>"
    }

    //this adds text into our container element
    animalContainer.insertAdjacentHTML('beforeEnd', htmlString);


}