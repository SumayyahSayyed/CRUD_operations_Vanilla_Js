let usersTable = document.getElementById("usersTable");
let fetchusersData = JSON.parse(localStorage.getItem("user"));
let fetchusersProject = JSON.parse(localStorage.getItem("projects"));
let fetchusersContent = JSON.parse(localStorage.getItem("editable-content"));

let usersMainHeading = document.getElementById("users-main-heading")

let tableRow = document.createElement("tr");
let userName = document.createElement("th");
let userEmail = document.createElement("th");
let userProjects = document.createElement("th");
let action = document.createElement("th");

tableRow.classList.add("main-row");

userName.innerHTML = "Name";
userEmail.innerHTML = "Email";
userProjects.innerHTML = "Projects";
action.innerHTML = "Actions";

usersTable.appendChild(tableRow);
tableRow.appendChild(userName);
tableRow.appendChild(userEmail);
tableRow.appendChild(userProjects);
tableRow.appendChild(action);


for (let eachuser of fetchusersData) {
    let dataRow = document.createElement("tr");

    dataRow.classList.add("table-row");

    let nameData = document.createElement("td");
    let emailData = document.createElement("td");
    let actionData = document.createElement("td");

    if (eachuser.userEmail !== "admin123@gmail.com") {

        nameData.innerHTML = eachuser.firstName + " " + eachuser.lastName;
        emailData.innerHTML = eachuser.userEmail;

        let iconDiv = document.createElement("div");
        let editIcon = document.createElement("img");
        let deleteIcon = document.createElement("img");

        iconDiv.classList.add("icon-div");
        editIcon.setAttribute("src", "../../Portfolio Website/assets/editable-icon/edit.png");
        editIcon.classList.add("edit-icon");
        deleteIcon.setAttribute("src", "../../Portfolio Website/assets/editable-icon/delete.png");
        deleteIcon.classList.add("delete-icon");
        emailData.classList.add("email-data");



        usersTable.appendChild(dataRow);
        dataRow.appendChild(nameData);
        dataRow.appendChild(emailData);

        let projectData = document.createElement("td");

        for (let eachproject of fetchusersProject) {
            if (eachuser.id === eachproject.projectID) {

                let projectsList = document.createElement("ul");
                let listData = document.createElement("li");

                projectData.classList.add("project-data");
                projectsList.classList.add("project-ul");
                listData.classList.add("project-li");

                listData.innerHTML = eachproject.projectNameData;

                let viewIconDiv = document.createElement("div");
                let viewIcon = document.createElement("img");


                viewIcon.setAttribute("src", "../../Portfolio Website/assets/editable-icon/eye.png");
                viewIconDiv.classList.add("view-icon-div")
                viewIcon.classList.add("view-icon");

                projectData.appendChild(projectsList);

                viewIconDiv.appendChild(viewIcon);
                listData.appendChild(viewIconDiv);
                projectsList.appendChild(listData);
                dataRow.appendChild(projectData);
            }

        }
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);
        actionData.appendChild(iconDiv);
        dataRow.appendChild(actionData);
    }
}

// viewFullProject(){
let view = document.querySelectorAll(".view-icon");
let projectView = document.getElementById("mainDiv");
let addNewUser = document.querySelector(".addNewUser");
let pageMainHeading = document.getElementById("users-main-heading");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-icon")) {
        usersTable.style.display = "none";
        addNewUser.classList.add("hide");
        projectView.classList.remove("hide");
        // pageMainHeading.classLists.add("hide");
        document.body.style.backgroundColor = "rgba(173, 173, 173, 0.171)";

        let listContent = e.target.closest('li').textContent;

        for (let eachproject of fetchusersProject) {

            if (eachproject.projectNameData === listContent) {
                let projectImage = document.getElementById("projectImage");
                let projectHeading = document.getElementById("projectHeading");
                let pDescription = document.getElementById("projectDescription");
                let seeLive = document.getElementById("seeLive");
                let repoLink = document.getElementById("repoLink");


                projectImage.setAttribute('src', eachproject.projectImg);
                projectHeading.innerHTML = eachproject.projectNameData;
                pDescription.innerHTML = eachproject.projectDescription;
                seeLive.setAttribute('href', eachproject.projectLiveLink);
                repoLink.setAttribute('href', eachproject.projectRepo);
            }
        }
    } else if (!e.target.classList.contains("mainDiv")) {
        projectView.classList.add("hide");
        usersTable.style.display = "block";
        addNewUser.classList.remove("hide");
        document.body.style.backgroundColor = "white";
    }
});


function deleteUser() {
    let deleteUser = document.querySelectorAll(".delete-icon");
    for (eachDeleteButton of deleteUser) {
        eachDeleteButton.addEventListener("click", (e) => {
            let tableRow = e.target.closest("tr");

            let emailData = tableRow.querySelector(".email-data");

            let userIndex = fetchusersData.findIndex(user => user.userEmail === emailData.textContent);
            if (userIndex !== -1) {
                let userId = fetchusersData[userIndex].id;

                let projectsToDelete = fetchusersProject.filter(project => project.projectID === userId);
                for (let projectToDelete of projectsToDelete) {
                    let projectIndex = fetchusersProject.indexOf(projectToDelete);
                    if (projectIndex !== -1) {
                        fetchusersProject.splice(projectIndex, 1);
                    }
                }
                let contentToDelete = fetchusersContent.filter(content => content.userID === userId);

                for (let editableData of contentToDelete) {
                    let editableIndex = fetchusersContent.indexOf(editableData);
                    if (editableIndex !== -1) {
                        console.log(editableIndex);
                        fetchusersContent.splice(editableIndex, 1);
                    }
                }

                fetchusersData.splice(userIndex, 1);

                localStorage.setItem("user", JSON.stringify(fetchusersData));
                localStorage.setItem("projects", JSON.stringify(fetchusersProject));
                localStorage.setItem("editable-content", JSON.stringify(fetchusersContent));

                tableRow.remove();
            }
        })
    }
}
deleteUser();


function editUser() {
    let editUser = document.querySelectorAll(".edit-icon");
    let addUser = document.getElementById("register-form");
    for (eachDeleteButton of editUser) {
        eachDeleteButton.addEventListener("click", (e) => {
            let tableRow = e.target.closest("tr");
            addUser.classList.remove("hide");
            usersTable.classList.add("hide");
            usersMainHeading.classList.add("hide");
            addNewUser.classList.add("hide");
            document.body.style.backgroundColor = "rgba(173, 173, 173, 0.171)";

            let emailData = tableRow.querySelector(".email-data");
            console.log(emailData.textContent);

            for (let userdata of fetchusersData) {
                if (userdata.userEmail == emailData.textContent) {
                    document.getElementById("firstname").value = userdata.firstName;
                    document.getElementById("lastname").value = userdata.lastName;
                    let newEmail = document.getElementById("email").value = userdata.userEmail;
                    document.getElementById("password").value = userdata.userPassword;

                    addUser.addEventListener("submit", (e) => {
                        e.preventDefault();

                        let userToUpdate = fetchusersData.find(user => user.userEmail === newEmail);

                        if (userToUpdate) {
                            userToUpdate.firstName = document.getElementById("firstname").value;
                            userToUpdate.lastName = document.getElementById("lastname").value;
                            userToUpdate.userEmail = document.getElementById("email").value;
                            userToUpdate.userPassword = document.getElementById("password").value;

                            localStorage.setItem("user", JSON.stringify(fetchusersData));
                        }
                        addUser.classList.add("hide");

                    });
                }
            }
        })
    }

}

editUser();

let data = JSON.parse(localStorage.getItem("user"));
let projects = JSON.parse(localStorage.getItem("projects"));

function search() {
    let searchBar = document.getElementById("search");
    let searchContainer = document.getElementById("searchContainer");
    let noResultsFound = true;

    searchBar.addEventListener("input", () => {
        let inputData = searchBar.value.toLowerCase();
        let searchResults = [];

        searchContainer.innerHTML = "";
        noResultsFound = true;

        searchContainer.classList.remove("none");
        usersMainHeading.classList.add("hide");
        usersTable.classList.add("hide");
        usersTable.style.display = "none";
        addNewUser.classList.add("hide");

        data.forEach((userData) => {
            projects.forEach((projectData) => {
                if (
                    userData.firstName.toLowerCase().includes(inputData) ||
                    userData.lastName.toLowerCase().includes(inputData) ||
                    userData.userEmail.toLowerCase().includes(inputData) ||
                    projectData.projectNameData.toLowerCase().includes(inputData) ||
                    projectData.projectDescription.toLowerCase().includes(inputData)
                ) {

                    if (userData.id === projectData.projectID) {
                        let combinedRow = {
                            user: userData,
                            project: projectData
                        };

                        searchResults.push(combinedRow);
                        noResultsFound = false;
                    }
                }
            });
        });

        let tableRow = document.createElement("tr");
        let userName = document.createElement("th");
        let userEmail = document.createElement("th");
        let userProjects = document.createElement("th");

        tableRow.classList.add("main-row");

        userName.innerHTML = "Name";
        userEmail.innerHTML = "Email";
        userProjects.innerHTML = "Projects";

        searchContainer.appendChild(tableRow);
        tableRow.appendChild(userName);
        tableRow.appendChild(userEmail);
        tableRow.appendChild(userProjects);

        if (searchResults.length > 0) {
            searchResults.forEach((result) => {
                console.log(result);
                let dataRow = document.createElement("tr");
                dataRow.classList.add("table-row");

                let nameData = document.createElement("td");
                let emailData = document.createElement("td");
                let projectData = document.createElement("td");

                // Access user and project data from the combined row
                nameData.innerHTML = result.user.firstName + " " + result.user.lastName;
                emailData.innerHTML = result.user.userEmail;
                projectData.innerHTML = result.project.projectNameData;

                dataRow.appendChild(nameData);
                dataRow.appendChild(emailData);
                dataRow.appendChild(projectData);
                searchContainer.appendChild(dataRow);
            });
        } else if (noResultsFound) {
            let noResultsItem = document.createElement("li");
            noResultsItem.textContent = "No results found.";
            searchContainer.appendChild(noResultsItem);
        }
    });
}

search();


document.addEventListener("click", (e) => {
    let selectedElement = e.target;
    if (!selectedElement.classList.contains("searchTable")) {
        searchContainer.classList.add("none");
        usersMainHeading.classList.remove("hide");
        usersTable.classList.remove("hide");
        addNewUser.classList.remove("hide");
        searchBar.value = "";
    }
})