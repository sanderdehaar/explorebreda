// Function to handle user registration
function register() {
    // Retrieving input values from the registration form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;
    const full_name = document.getElementById('full_name').value;

    if (!validate_field(full_name, 'Full name')) {
        return;
    }

    if (!validate_email(email, 'Email')) {
        return;
    }

    if (!validate_password(password, confirm_password)) {
        return;
    }

    // Creating a new user account with Firebase authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;

            // Setting up user data in the Firebase Realtime Database
            const database_ref = database.ref();

            const user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            // Saving user data to the database
            database_ref.child('users/' + user.uid).set(user_data)
                .then(() => {
                    // Setting cookies for user email and full name
                    document.cookie = `user_email=${user_data.email}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                    document.cookie = `user_full_name=${user_data.full_name}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                    // Store alert information in localStorage
                    localStorage.setItem('alertInfo', JSON.stringify({ title: 'success', message: 'Successfully created an account' }));

                    // Redirect to 'index.html'
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error('Error adding data to the database:', error);
                });
        })
        .catch(function (error) {
            // Handling authentication errors during registration
            const error_code = error.code;
            const error_message = error.message;
            showAlert("error", error_message);
        });
}

// Function to handle user login
function login() {
    // Retrieving input values from the login form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!validate_email(email, 'Email')) {
        return;
    }

    if (password.length == 0) {
        showAlert("error", "Password field cannot be empty");
        return;
    }

    // Signing in with Firebase authentication
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;

            // Updating last login timestamp in the Firebase Realtime Database
            const database_ref = database.ref();
            const user_data = {
                last_login: Date.now()
            };

            database_ref.child('users/' + user.uid).update(user_data);

            // Retrieving additional user data and setting cookies
            getUserData().then(userDetails => {
                document.cookie = `user_email=${userDetails.email}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                document.cookie = `user_full_name=${userDetails.full_name}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                // Store alert information in localStorage
                localStorage.setItem('alertInfo', JSON.stringify({ title: 'success', message: 'Successfully logged in' }));

                // Redirect to 'index.html'
                window.location.href = 'index.html';
            }).catch(error => {
                console.error('Error retrieving user data:', error);
            });
        })
        .catch(function (error) {
            // Handling authentication errors during login
            const error_code = error.code;
            const error_message = error.message;

            if (error_code === 'auth/internal-error') {
                showAlert("error", "Email or password is incorrect");
            }
        });
}

// Function to handle user logout
function logout() {
    // Signing out the user with Firebase authentication
    firebase.auth().signOut().then(function () {
        // Clearing user cookies and redirecting to the index page
        document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'user_full_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Store alert information in localStorage
        localStorage.setItem('alertInfo', JSON.stringify({ title: 'success', message: 'Successfully logged out' }));

        // Redirect to 'index.html'
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.error('Something went wrong:', error);
    });
}

// Function to get a specific cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// Function to retrieve user data from the Firebase Realtime Database
function getUserData() {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;

        // Checking if the user is logged in
        if (user) {
            const database_ref = database.ref('users/' + user.uid);

            // Retrieving user data from the database
            database_ref.once('value')
                .then(function (snapshot) {
                    const userData = snapshot.val();
                    resolve(userData);
                })
                .catch(function (error) {
                    reject(error);
                });
        } else {
            reject('User not logged in');
        }
    });
}

// Check account function
function checkAuthorization() {
    firebase.auth().onAuthStateChanged(function (user) {
        const accountStatus = document.getElementById('account_status');
        const loginStatus = document.getElementById('login_status');

        const accountEmail = document.getElementById('account_email');
        const accountName = document.getElementById('account_name');

        // Retrieve cookies
        const userFullName = getCookie('user_full_name');
        const userEmail = getCookie('user_email');

        if (user) {
            // Account
            accountStatus.classList.toggle("is-active");
            loginStatus.classList.toggle("is-active");

            // Show account details
            accountName.textContent = userFullName;
            accountEmail.textContent = userEmail;
        } else {
            // Login
            accountStatus.classList.remove("is-active");
            loginStatus.classList.remove("is-active");
        }
    });
}

// Check authorization on load of page
document.addEventListener('DOMContentLoaded', checkAuthorization);

// Function to validate email format
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        showAlert("error", "Email cannot be empty");
        return false;
    }
}

// Function to validate if a field is not empty
function validate_field(field, field_name) {
    if (field == null || field.length <= 0) {
        showAlert("error", `${field_name} cannot be empty`);
        return false;
    } else {
        return true;
    }
}

// Function to validate password and confirm password
function validate_password(password, confirm_password) {
    if (password.length == 0 || confirm_password.length == 0) {
        showAlert("error", "Password field cannot be empty");
        return false;
    }

    // Checking if password and confirm password match
    if (password !== confirm_password) {
        showAlert("error", "Password is not the same");
        return false;
    }

    return true;
}

// Custom Alert
function showAlert(title, message) {
    const infoAlert = document.getElementById('alert');
    if (infoAlert) {
        // Set title and message
        infoAlert.innerHTML = '<h3>' + title + '</h3>' + '<p>' + message + '</p>';
        infoAlert.classList.toggle("is-active");

        // Set a timeout to hide the alert after 4 seconds
        setTimeout(function() {
            infoAlert.classList.toggle("is-active");
        }, 2600);
    }
}

// Alert after redirect
const alertInfoString = localStorage.getItem('alertInfo');

if (alertInfoString) {
    const alertInfo = JSON.parse(alertInfoString);
    showAlert(alertInfo.title, alertInfo.message);
    localStorage.removeItem('alertInfo');
}