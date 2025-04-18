/**
 * Author: Michael Massey
 * Date: 2024-11-03
 * Description: This file contains JavaScript code that validates a user registration form.
 * The script handles form validation for email, age, username, and password fields, provides
 * feedback to users, and includes a feature to toggle password visibility.
 */

// Adds a click event listener to the "Clear" button to reset the form and clear feedback messages.
document.getElementById("clearBtn").addEventListener('click', () => {
    document.getElementById('userFeedback').innerHTML = ''; // Clears any feedback text
    document.getElementById("userForm").reset(); // Resets all form fields to their default values
});

// Function to validate the age input
let validateAge = () => {
    let userAge = parseInt(document.getElementById('userAge').value); // Retrieves and converts the age input to an integer
    let ageFeedback = document.getElementById('ageFeedback');
    if (userAge < 18) { // Checks if the age is below 18
        ageFeedback.setAttribute("class", "failVal");
        ageFeedback.textContent = 'You are too young to create an account.'; // Error message for age below 18
        return false;
    } else if (userAge > 60) { // Checks if the age is above 60
        ageFeedback.setAttribute("class", "failVal");
        ageFeedback.getElementById('ageFeedback').textContent = 'You may be too old to create an account.'; // Error message for age above 60
        return false;
    } else {
        ageFeedback.textContent = ''; // Clears the error message if age is within range
        return userAge;
    }
};

// Function to validate password input
let validatePswd = () => {
    let passwordFeedback = document.getElementById('passwordFeedback');
    let userPassword = document.getElementById("userPswd").value; // Retrieves the entered password

    // Check if password length is sufficient
    if (userPassword.length < 5) {
        passwordFeedback.setAttribute("class", "failVal");
        passwordFeedback.textContent = "Password is not long enough. Please make sure the password is longer than 5 characters.";
        return false;
    }
    // Check if the password contains at least one number
    else if (!/[0-9]/.test(userPassword)) {
        passwordFeedback.setAttribute("class", "failVal");
        passwordFeedback.textContent = "Password must contain at least one number.";
        return false;
    }
    // Check if the password contains at least one special character
    else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(userPassword)) {
        passwordFeedback.setAttribute("class", "failVal");
        passwordFeedback.textContent = "Password must contain at least one special character (e.g., !, @, #, $).";
        return false;
    } else {
        passwordFeedback.textContent = ""; // Clears the feedback if all conditions are met
        return true;
    }
};

// Function to validate email input
let validateEmail = () => {
    let emailFeedback = document.getElementById('emailFeedback');
    let email = document.getElementById('userEmail').value;
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
        emailFeedback.setAttribute("class", "failVal");
        emailFeedback.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailFeedback.textContent = '';
        return true;
    }
};

// Function to validate username input
let validateUserName = () => {
    let userNameFeedback = document.getElementById('userNameFeedback');
    let userName = document.getElementById("createUsrName").value;

    if (!/[0-9]/.test(userName)) {
        userNameFeedback.setAttribute("class","failVal");
        userNameFeedback.textContent = "Username must contain at least one number.";
        return false;
    } else {
        userNameFeedback.textContent = '';
        return true;
    }
};

// Main function to validate the form before submission
let validateForm = (e) => {
    e.preventDefault(); // Prevent form submission for validation
    const isEmailValid = validateEmail(); // Validates the email field
    const isAgeValid = validateAge(); // Validates the age field
    const isPasswordValid = validatePswd(); // Validates the password field
    const isUserNameValid = validateUserName(); // Validates the username field

    if (isEmailValid && isAgeValid && isPasswordValid && isUserNameValid) {
        let userFeedback = document.getElementById("userFeedback")
        userFeedback.id = "passVal";
        userFeedback.textContent = "All validations passed! Creating Account Now...";
        
        // Store form data in localStorage
        localStorage.setItem("userRealName", document.getElementById("userName").value);
        localStorage.setItem("userAge", document.getElementById("userAge").value);
        localStorage.setItem("userName", document.getElementById("createUsrName").value);
        localStorage.setItem("email", document.getElementById("userEmail").value);

        // Redirect to new page after 2 seconds
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        document.getElementById("userFeedback").textContent = "Please correct the errors above.";
    }
};


// Function to toggle the visibility of the password field
let showPassword = () => {
    let showPswd = document.getElementById("showPassword"); // Checkbox for toggling password visibility
    let password = document.getElementById("userPswd"); // Password input field

    if (showPswd.checked) { // If checkbox is checked
        password.type = "text"; // Display password as plain text
    } else {
        password.type = "password"; // Hide password with asterisks/dots
    }
};


// Event listeners for real-time validation
document.getElementById("userAge").addEventListener("keyup", validateAge); // Triggers age validation on keyup
document.getElementById("userEmail").addEventListener("keyup", validateEmail); // Triggers email validation on keyup
document.getElementById("createUsrName").addEventListener("keyup", validateUserName); // Triggers username validation on keyup
document.getElementById("userPswd").addEventListener("keyup", validatePswd); // Triggers password validation on keyup
document.getElementById("submitBtn").addEventListener("click", validateForm); // Triggers form validation on submit button click
document.getElementById("showPassword").addEventListener("change", showPassword); // Toggles password visibility on checkbox change
