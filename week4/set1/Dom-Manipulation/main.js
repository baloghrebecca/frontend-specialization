//Hide + Show Button

const btn = document.querySelector('#btn');
const secret = document.querySelector('#secret');

btn.addEventListener('click', toggle)

function toggle() {
    if (secret.style.display === "none") {
        secret.style.display = "block";
        btn.textContent = "Hide Super Secret";
    } else {
        secret.style.display = "none";
        btn.textContent = "Show Super Secret";
    }
}

// Form 

//Elements
const name = document.getElementById('uname')
const password = document.getElementById('password')
const form = document.getElementById('form')

//Error Msgs Containers
const invalidPassword = document.getElementById('invalid-password')
const invalidUser = document.getElementById('invalid-user')
const invalidMusic = document.getElementById('invalid-music')
const invalidColor = document.getElementById('invalid-color')

//Main
form.addEventListener('submit', (e) => {
    var counter = 0;

    if (isUsernameValid()) {
        invalidUser.textContent = "No Username entered. Please try again.";
        counter++
    }

    if (areInvalidCharactersIncluded()) {
        invalidUser.textContent = "Your Username includes a wrong character. Please try again.";
        counter++
    }

    if (isPasswordValid()) {
        invalidPassword.textContent = "Password needs to have at least 8 characters. Please try again.";
        counter++
    }

    if (!isColorSelected()) {
        invalidColor.textContent = "Color not selected. Please try again.";
        counter++
    }

    if (!isMusicSelected()) {
        invalidMusic.textContent = "You must select at least 2. Please try again.";
        counter++
    }

    if (counter > 0) {
        e.preventDefault();
    } 
});



//Service Classes
function isUsernameValid() {
    let nameInput = name.value;
    if (nameInput === null || nameInput === "") {
        return true;
    }

    return false;
}

function areInvalidCharactersIncluded() {
    let nameInput = name.value;
    let invalidCharacters = ["-", "#", "%", "+", "."];
    for (var i = 0; i < nameInput.length; i++) {
        for (var j = 0; j < invalidCharacters.length; j++) {
            if (nameInput.charAt(i) === invalidCharacters[j]) {
                return true;
            }
        }
    }
    return false;
}

function isPasswordValid() {
    let passwordInput = password.value;
    if (passwordInput === null || passwordInput === "") {
        return true;
    } else if (passwordInput.length <= 8) {
        return true;
    }

    return false;
}

function isColorSelected() {
    let black = document.getElementById("color-black");
    let white = document.getElementById("color-white");

    if (black.checked || white.checked) {
        return true;
    }

    return false;

}

function isMusicSelected() {
    let classic = document.getElementById("music-classic");
    let rock = document.getElementById("music-rock");
    let pop = document.getElementById("music-pop");
    let jazz = document.getElementById("music-jazz");

    var genres = [classic, rock, pop, jazz];

    var counter = 0;
    var genre;

    for (var i = 0; i < genres.length; i++) {
        genre = genres[i];
        if (genre.checked)  {
            counter++;
        }
    }

    if (counter > 1) {
        return true;
    }

    return false; 

}