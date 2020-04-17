//API related
const API_KEY = 'AIzaSyCTryhlVmmRHYE7iQT3k0eeNRHIKsTMpRw';

//DOM related
const button = document.querySelector('#login-button');
const emailField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const form = document.querySelector('#login-form');
const welcomeDiv = document.querySelector('#welcome-message');
const requestErrorDiv = document.querySelector('#request-error');

//AJAX
form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let emailValue = emailField.value;
    let passwordValue = passwordField.value;

    const field = {
        "email": emailValue,
        "password": passwordValue,
        "returnSecureToken": true
    };

    const request = new XMLHttpRequest();
    request.open("POST", `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
        checkValidity(request);
    };

    request.send(JSON.stringify(field));

});


function checkValidity(request) {
    let response = JSON.parse(request.responseText);
    let responseName = response.displayName;
    if (request.status >= 200 && request.status < 300) {
        welcomeDiv.textContent = `Welcome, ${responseName}!`;
        button.disabled = true;
        requestErrorDiv.textContent = "";
    }
    else if (response.error.message == "EMAIL_NOT_FOUND") {
        requestErrorDiv.textContent = `Your email doesn't exist! Please try again.`;
    }
    else if (response.error.message == "INVALID_PASSWORD") {
        requestErrorDiv.textContent = `Your password is wrong. Please try again.`;
    }
    else if (response.error.message == "USER_DISABLED") {
        requestErrorDiv.textContent = `Your account has been disabled.`;
    }
    else if (!(response.error.message == "USER_DISABLED" || response.error.message == "EMAIL_NOT_FOUND" || response.error.message == "INVALID_PASSWORD") && request.status == 400) {
        requestErrorDiv.textContent = `Some error occured. Please try again.`;
    }
    request.onerror = () => {
        console.log("An error occured: " + response.error + " " + request.status);
    };
};

