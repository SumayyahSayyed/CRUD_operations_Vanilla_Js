let submit = document.getElementById("social-form");
let id = sessionStorage.getItem("id");

submit.addEventListener("submit", (e) => {
    e.preventDefault();

    let github = document.getElementById("github").value;
    let linkedin = document.getElementById("linkedin").value;
    let twitter = document.getElementById("twitter").value;

    if (!github || !linkedin || !twitter) {
        validateForm(github, linkedin, twitter);
    }
    else {
        let data = {
            socialID: id,
            githubLink: github,
            linkedinLink: linkedin,
            twitterlink: twitter
        }


        localStorage.setItem("socials", JSON.stringify(data));


        window.location.href = "../../Portfolio Website/index.html";
    }

})


function removeErrorMessage() {
    const errorLabel = document.querySelector(".error-message");
    if (errorLabel !== null) {
        errorLabel.remove();
    }
}
function validateForm(github, linkedin, twitter) {
    let errorLabel = document.querySelector(".error-message");


    if (github == "" && !errorLabel) {
        let select = document.querySelector('input[name="github"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please enter your Github Link";
        errorLabel.style.color = "red";
        errorLabel.style.display = "block";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);

    }
    else if (linkedin == "" && !errorLabel) {
        let select = document.querySelector('input[name="linkedin"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please enter your LinkedIn Profile Link";
        errorLabel.style.color = "red";
        errorLabel.style.display = "block";


        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
    }
    else if (twitter == "" && !errorLabel) {
        let select = document.querySelector('input[name="twitter"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please link your Twitter account";
        errorLabel.style.color = "red";
        errorLabel.style.display = "block";


        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
    }
}
