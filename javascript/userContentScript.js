// Get stored values from localStorage
const userRealName = localStorage.getItem("userRealName");
const userAge = localStorage.getItem("userAge");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("email");

// DOM elements
const updateButton = document.getElementById("updateButton");
const updateEmail = document.createElement("input");
const emailParentNode = document.getElementById("email");
const userNameParentNode = document.getElementById("userName");
const saveButton = document.createElement("button");
const userAgeParentNode = document.getElementById("age");
const updateUserName = document.createElement("input");
const updateUserAge = document.createElement("input");
const buttonParentNode = document.getElementById("profile-container");
const blank = document.getElementById("blank");

// Configure input fields and Save button
updateUserAge.setAttribute("type", "number");
updateEmail.setAttribute("type", "email");
updateUserName.setAttribute("type", "text");
updateUserAge.setAttribute("class", "container");
updateEmail.id = "newUserEmail";
updateUserAge.id = "newUserAge"; 
updateUserName.id = "newUserName";
saveButton.textContent = "Save";
saveButton.id = "saveButton";

// Display initial information from localStorage if available
if (userRealName) {
    const welcomeMessageElement = document.getElementById("welcome-message");
    if (welcomeMessageElement) {
        welcomeMessageElement.textContent = `Hello ${userRealName}! Welcome to our site!`;
    }
}
if (userAge) {
    const ageMessage = document.getElementById("age");
    if (ageMessage) {
        ageMessage.textContent = `User's age: ${userAge}`;
    }
}
if (userName) {
    const userNameMessage = document.getElementById("userName");
    if (userNameMessage) {
        userNameMessage.textContent = `Username: ${userName}`;
    }
}
if (userEmail) {
    const emailMessage = document.getElementById("email");
    if (emailMessage) {
        emailMessage.textContent = `User's email: ${userEmail}`;
    }
}

// Clear localStorage after initial display
localStorage.removeItem("userRealName");
localStorage.removeItem("userAge");
localStorage.removeItem("userName");
localStorage.removeItem("email");

// Validation functions
const validateAge = (value) => {
    const age = parseInt(value);
    const errorMessage = document.getElementById("ageMessage");
    if (age < 18 || age > 60) {
        errorMessage.textContent = 'Age must be between 18 and 60.';
        return false;
    } else {
        errorMessage.textContent = '';
        return true;
    }
};

const validateUserName = (value) => {
    const userNameError = document.getElementById("userNameMessage");
    if (!/[0-9]/.test(value) || !/[a-zA-Z]/.test(value)) {
        userNameError.textContent = "Username must contain at least one number and one letter.";
        return false;
    } else {
        userNameError.textContent = '';
        return true;
    }
};

const validateEmail = (value) => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const emailError = document.getElementById("emailMessage");
    if (!value.match(emailPattern)) {
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
};

// Add input fields and Save button when Update button is clicked
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    emailParentNode.appendChild(updateEmail);
    userNameParentNode.appendChild(updateUserName);
    userAgeParentNode.appendChild(updateUserAge);
    blank.appendChild(saveButton);
});

// Save button click event for validating and displaying user info
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const saveMessage = document.getElementById("saveMessage");

    // Get values from input fields
    const updatedEmail = document.getElementById("newUserEmail").value;
    const updatedUserName = document.getElementById("newUserName").value;
    const updatedAge = document.getElementById("newUserAge").value;

    // Elements to display user information
    const emailMessage = document.getElementById("email");
    const userNameMessage = document.getElementById("userName");
    const ageMessage = document.getElementById("age");

    // Reset error messages for each click
    document.getElementById("emailMessage").textContent = "";
    document.getElementById("userNameMessage").textContent = "";
    document.getElementById("ageMessage").textContent = "";

    // Validate each field
    const isEmailValid = validateEmail(updatedEmail);
    const isUserNameValid = validateUserName(updatedUserName);
    const isAgeValid = validateAge(updatedAge);

    // If all inputs are valid, display the updated information and remove the Save button
    if (isEmailValid && isUserNameValid && isAgeValid) {
        emailMessage.textContent = `User's email: ${updatedEmail}`;
        userNameMessage.textContent = `Username: ${updatedUserName}`;
        ageMessage.textContent = `User's age: ${updatedAge}`;
        saveMessage.textContent = "Info Saved!";

        // Display success message, then remove both message and Save button after 1 second
        setTimeout(() => {
            saveMessage.textContent = "";
            saveButton.remove();
        }, 1000);
    } else {
        // Clear success message if any input is invalid
        saveMessage.textContent = "";
    }
});
