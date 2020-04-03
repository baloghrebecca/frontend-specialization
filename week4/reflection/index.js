// DOM Elements:
const FORM = document.getElementById('survey-form');
const NAME = document.getElementById('name');
const AGE = document.getElementById('age');
const USER_RECOMMEND = document.getElementsByName('user-recommend');
const FAVORITE_FEATURE = document.getElementById('most-like');
const ROLE = document.getElementById('role-dropdown');

// ERROR MSG CONTAINERS
const INVALID_NAME = document.getElementById('form-error-name')
const INVALID_AGE = document.getElementById('form-error-age')
const INVALID_RECOMMEND = document.getElementById('form-error-recommend')
const INVALID_MOST_LIKE = document.getElementById('form-error-most-like')
const INVALID_ROLE = document.getElementById('form-error-role')


// MAIN FUNCTION

FORM.addEventListener('submit', (e) => {
    var counter = 0;
    var nameInput = NAME.value;
    var ageInput = AGE.value;

    if (isNameInvalid(nameInput)) {
        addErrorMsgName(nameInput);
        counter++
    }

    if (isAgeInvalid(ageInput)) {
        addErrorMsgAge();
        counter++;
    }

    if (isRecommendNotChecked()) {
        addErrorMsgRecommended();
        counter++;
    }

    if (isNotSelected()) {
        addErrorMsgMostLike();
        counter++;
    }

    if (isRoleNotSelected()) {
        addErrorMsgRole();
        counter++;
    }

    if (counter > 0) {
        e.preventDefault();
    }
});

//Error Msgs

function addErrorMsgRole() {
    INVALID_ROLE.style.display = "block";
    INVALID_ROLE.textContent = "Please select a value.";
}

function addErrorMsgName(nameInput) {
    INVALID_NAME.style.display = "block";
    INVALID_NAME.textContent = "Value should be at least 3 characers; You entered " + nameInput.length + ".";
}

function addErrorMsgAge() {
    INVALID_AGE.style.display = "block";
    INVALID_AGE.textContent = "Value should be at most 99.";
}

function addErrorMsgRecommended() {
    INVALID_RECOMMEND.style.display = "block";
    INVALID_RECOMMEND.textContent = "Please select a value.";
}

function addErrorMsgMostLike() {
    INVALID_MOST_LIKE.style.display = "block";
    INVALID_MOST_LIKE.textContent = "Please select a value.";
}

//Conditionals:

function isRoleNotSelected() {
    return ROLE.selectedIndex === 0;
}

function isNotSelected() {
    return FAVORITE_FEATURE.selectedIndex === 0;
}

function isRecommendNotChecked() {
    return !(USER_RECOMMEND[0].checked || USER_RECOMMEND[1].checked || USER_RECOMMEND[2].checked);
}

function isAgeInvalid(ageInput) {
    return ageInput > 99;
}

function isNameInvalid(nameInput) {
    return nameInput.length < 3 || nameInput === "" || nameInput === null;
}

