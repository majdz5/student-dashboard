// Toggle between login and sign-up forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.style.display = (loginForm.style.display === 'none') ? 'block' : 'none';
    signupForm.style.display = (signupForm.style.display === 'none') ? 'block' : 'none';
}

// Toggle password visibility
function togglePasswordVisibility(passwordId, iconId) {
    const passwordField = document.getElementById(passwordId);
    const icon = document.getElementById(iconId);
    
    if (passwordField.type === "password") {
        passwordField.type = "text";  // Show password
        icon.classList.replace('fa-eye', 'fa-eye-slash');  // Change icon to eye-slash
    } else {
        passwordField.type = "password";  // Hide password
        icon.classList.replace('fa-eye-slash', 'fa-eye');  // Change icon back to eye
    }
}


// Validate login form
function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Additional validation (e.g., regex for email format)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }

    // Here you can add backend API calls to authenticate the user
    alert("Login successful!");
    return false;
}

// Validate sign-up form
function validateSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Additional email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }

    // Here you can add backend API calls to create the user account
    alert("Sign up successful!");
    return false;
}
