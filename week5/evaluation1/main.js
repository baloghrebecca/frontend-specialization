document.addEventListener("DOMContentLoaded", (event) => {
    const contactButton = document.querySelector("#contact-me-button");
    const form = document.querySelector("#contact-form");

    //Toggle On Click

    contactButton.addEventListener("click",(event) => toggle(form));

    function toggle(form) {
        const formStyle = form.style;
        const isDisplayNone = formStyle.display == "none" || formStyle.display == '';
        
        if (isDisplayNone) {
            formStyle.display = "block";
        } else {
            formStyle.display = "none";
        }
    }

    //Form Validation
    form.addEventListener("submit", (event) => {
        const name = document.querySelector("#fname");
        const msg = document.querySelector("#message");
     
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        areInputFieldsValid(name);
        areInputFieldsValid(msg);
    });


    function areInputFieldsValid(inputField) {
        const errorDiv = document.querySelector("#" + inputField.id + " + .error");
        const field = selectRightOutputField(inputField);
    
        if (inputField.validity.tooShort) {
            errorDiv.textContent = field() + " is too short.";
        } else if (inputField.validity.tooLong) {
            errorDiv.textContent = field() + " is too long.";
        } else if (inputField.validity.valueMissing) {
            errorDiv.textContent = field() + " not entered.";
        } else {
            errorDiv.textContent = "";
        }
    }
    

    function selectRightOutputField(inputField) {
        return () => {
            if (inputField.id == "fname") {
                return "Name";
            }
            else {
                return "Message";
            }
        };
    }

});


