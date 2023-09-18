let submit = document.getElementById("register-form");

const generateId = () => Math.random().toString(36);

submit.addEventListener("submit", (e) => {
    e.preventDefault();

    let fName = document.getElementById("firstname").value;
    let lName = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let isTrue = validateForm(fName, lName, phone, email, password);

    if (isTrue) {

        let data = {
            id: generateId(),
            firstName: fName,
            lastName: lName,
            userPhone: phone,
            userEmail: email,
            userPassword: password
        }

        // Retrieving existing users from localStorage
        let users = JSON.parse(localStorage.getItem('user')) || [];
        // console.log(users);
        let exists = false;

        for (let user of users) {
            if (user.userEmail === data.userEmail) {
                exists = true;
                alert("User already exists.");
                break;
            }
        }

        if (!exists) {
            users.push(data);
            localStorage.setItem("user", JSON.stringify(users));

            sessionStorage.setItem("username", data.firstName + " " + data.lastName);
            sessionStorage.setItem("phone", data.userPhone);
            sessionStorage.setItem("email", data.userEmail);
            sessionStorage.setItem("id", data.id);

            if (data.userEmail === "admin123@gmail.com" && data.userPassword === "admin123") {
                window.location.href = "./Website/Admin/admin.html";
            }
            else {
                window.location.href = "./Website/Social Links/index.html";
            }
        }
    }
    else {
        isTrue = validateForm(fName, lName, phone, email, password);
    }

})

function removeErrorMessage() {
    const errorLabel = document.querySelector(".error-message");
    if (errorLabel !== null) {
        errorLabel.remove();
    }
}
function validateForm(fName, lName, phone, email, password) {
    removeErrorMessage();
    let errorLabel = document.querySelector(".error-message");
    console.log(fName);

    if (fName == "" && !errorLabel) {
        let select = document.querySelector('input[name="firstname"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please fill in your First Name";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (fName && /[^A-Za-z]/.test(fName) && !errorLabel) {
        let select = document.querySelector('input[name="firstname"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Name cannot contain numbers or special characters";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (lName == "" && !errorLabel) {
        let select = document.querySelector('input[name="lastname"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please fill in your Last Name";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;

    }
    else if (lName && /[^A-Za-z]/.test(lName) && !errorLabel) {
        let select = document.querySelector('input[name="lastname"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Name cannot contain numbers or special characters";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (phone == "" && !errorLabel) {
        let select = document.querySelector('input[name="phone"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please fill in your Phone Number";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (phone && /[^0-9]/.test(phone) && !errorLabel) {
        let select = document.querySelector('input[name="phone"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Phone Number cannot contain alphabets or special numbers";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (email == "" && !errorLabel) {
        let select = document.querySelector('input[name="email"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please fill in email address";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;

    }
    else if (email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email) && !errorLabel) {
        let select = document.querySelector('input[name="email"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Invalid email address";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }
    else if (password == "" && !errorLabel) {
        let select = document.querySelector('input[name="password"]');
        errorLabel = document.createElement("label");
        errorLabel.classList.add("error-message");
        errorLabel.innerText = "Please enter the password";
        errorLabel.style.color = "red";

        select.parentElement.insertAdjacentElement('beforeend', errorLabel);
        return false;
    }

    return true;
}
