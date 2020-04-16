//INTERSECTION OBSERVER:

const header = document.querySelector('header');
const hTwo = document.querySelector('h2');
const mainSearch = document.querySelector('#main-search');
const input = document.querySelector('#search');
const label = document.querySelector('label')
const description = document.querySelector('#description');
const imgGifContainer = document.querySelector('#img');
const img = document.querySelector('#gifs');
const closeButton = document.querySelector('.close-img');
const closeDiv = document.querySelector('#close');
const gifUpload = document.querySelector('#gif');
const button = document.querySelector('#btn');
const form = document.querySelector('form');
const messageDiv = document.querySelector('#msg');

//EVENTS

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    let imgGifContainerStyle = imgGifContainer.style;
    const isImgContainerVisible = imgGifContainerStyle.display == "none" || imgGifContainerStyle.display == '';
    if (isImgContainerVisible) {
        img.src = "";
    }

});

gifUpload.onchange = function () {
    label.textContent = this.files[0].name;
}

//HEADER INTERSECTION
const mainSectionConfig = {
    rootMargin: '-50px 0px', //margin to the viewport. when the observer should fire!
}

const mainSectionObserver = new IntersectionObserver(function (entries, mainSectionObserver) {

    entries.forEach(entry => {
        //  console.log(entry.target); this one logs out or mainSearch element
        if (!entry.isIntersecting) {
            hTwo.textContent = 'Upload';
            header.classList.add('active');
        } else {
            header.classList.remove('active');
            hTwo.textContent = 'Search';
        }
    });


}, mainSectionConfig);

mainSectionObserver.observe(mainSearch); //we need to call the method 'observe' on our observer and enter the element that should be observed! 


//INPUT INTERSECTION

const mainSectionConfigTwo = {
    rootMargin: '-50% 0px',
};


const mainSectionObserverTwo = new IntersectionObserver(function (entries, mainSectionObserverTwo) {

    entries.forEach(entry => {
        let inputStyle = input.style;
        let formStyle = form.style;
        let descriptionStyle = description.style;
        //  console.log(entry.target); this one logs out or mainSearch element
        if (!entry.isIntersecting) {
            inputStyle.display = "none";
            formStyle.display = "block";
            descriptionStyle.display = "none";
        } else {
            inputStyle.display = "block";
            formStyle.display = "none";
            descriptionStyle.display = "block";
        }
    });

}, mainSectionConfigTwo);


mainSectionObserverTwo.observe(mainSearch);



//AJAX FOR 'GET'

const API_KEY = 'ExK8xzA8a5BeVYzlTrCD4B3CzE5dwvo1'



input.addEventListener("keyup", function (event) {

    if (event.keyCode === 13) {
        getGif();
    }

});

function getGif() {
    const searchTerm = input.value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`, true);
    xhr.onload = function () {
        if (this.status == 200) {
            let randomNumber = Math.floor(Math.random() * 51);
            let giphyJson = JSON.parse(this.responseText);
            // console.log(giphyJson.data[randomNumber].images.downsized.url);
            let url = giphyJson.data[randomNumber].images.downsized.url;
            if (url == "" || url == null || url == undefined ) {
                description.textContent = `Something went wrong! Please try again.`;
            } else  {
                img.src = url;
            }
        } 
        
        xhr.onerror = () => {
            console.log("error", xhr.statusText);
            description.textContent = `Something went wrong! Please try again.`;
        };

    }
    xhr.send();
};


// AJAX FOR 'POST'
// I don't have authentification to post to giphy, unfortunately

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = gifUpload.value;
    const request = new XMLHttpRequest();

    const gifFile = {
        "file": file,
        "title": "This is just a test, if it worked out"
    };

    request.open("POST", `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&file=${file}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    //  request.setRequestHeader("Authorization", "token 27abd4d09e76afa1a2e7049444d56b04054ad370"); MISSING! 

    request.onload = () => {
        let status = request.statusText;
        if (request.status != 200) {
            messageDiv.textContent = "This is the status: " + status;
        } else {
            messageDiv.textContent = "Success!";
        }

        console.log(request.status);

    };


    request.send(JSON.stringify(gifFile));


});

