let submit = document.getElementById("register-form");

submit.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let isValid = validateForm(email, password);

    if (isValid) {
        let getUserInfo = JSON.parse(localStorage.getItem('user')) || [];
        let loggedName = "";
        let loggedEmail = "";
        let loggedId = "";

        for (let user of getUserInfo) {
            if (user.userEmail === email) {
                loggedName = user.firstName + " " + user.lastName;
                loggedEmail = user.userEmail;
                loggedId = user.id;
            }
        }

        sessionStorage.setItem("username", loggedName);
        sessionStorage.setItem("email", loggedEmail);
        sessionStorage.setItem("id", loggedId);

        if (email === "admin123@gmail.com" && password === "admin123") {
            window.location.href = "../Admin/admin.html";
        } else {
            window.location.href = "../../Portfolio Website/index.html";
        }
    }
});

function validateForm(email, password) {
    let errorLabel = document.querySelector(".error-message");
    let usersData = JSON.parse(localStorage.getItem("user"));
    let foundUser = usersData.find(user => user.userEmail === email);
    let foundUserPassword = usersData.find(user => user.userPassword === password);

    if (!foundUser || !foundUserPassword) {
        if (errorLabel) {
            errorLabel.remove();
        }

        errorLabel = document.createElement('label');
        errorLabel.innerHTML = 'Incorrect email or password';
        errorLabel.classList.add("error-message");
        errorLabel.style.color = 'red';

        let userEmail = document.querySelector('input[name="email"]');
        userEmail.parentElement.insertAdjacentElement('beforeend', errorLabel);

        return false;
    }

    return true;
}

function removeErrorMessage() {
    const errorLabel = document.querySelector(".error-message");
    if (errorLabel !== null) {
        errorLabel.remove();
    }
}
