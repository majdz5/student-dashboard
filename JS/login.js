function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formContainer = document.querySelector('.container');
   
   
    // Trigger active class for animation

    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');

    if (loginForm.classList.contains('active')) {
    
    setTimeout(()=> {

        formContainer.style.height = '50vh'; 

    },500);
        
    } else {
        formContainer.style.height = '80vh'; 
    }
   
    setTimeout(() => {
        if (loginForm.classList.contains('active')) {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }, 500); 
}

function Redirect() {
    window.location.href = "../HTML/dashboard.html"; 
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

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }

   
    alert("Login successful!");
    Redirect();
   
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

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }


    // Here Goes API
    alert("Sign up successful!");
    Redirect();

    return false;
}
