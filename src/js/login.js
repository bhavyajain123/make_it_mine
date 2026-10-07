import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    
    linkWithCredential
} from "firebase/auth";

import { auth } from "../firebase/config.js";


const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const formMessage = document.getElementById("formMessage");
const nameGroup = document.getElementById("nameGroup");
const confirmGroup = document.getElementById("confirmGroup");
const loginOptions = document.getElementById("loginOptions");
const submitButton = document.getElementById("submitButton");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

let currentMode = "login";


function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "message " + type;
}


function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "message";
}


function getFirebaseError(error) {

    switch (error.code) {

        case "auth/email-already-in-use":
            return "An account with this email already exists.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password should be at least 6 characters.";

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Invalid email or password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        default:
            return "Something went wrong. Please try again.";
    }
}


function setMode(mode) {

    currentMode = mode;
    clearMessage();

    document.querySelectorAll(".mode-tab").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );

    });

    const isSignup = mode === "signup";

    nameGroup.hidden = !isSignup;
    confirmGroup.hidden = !isSignup;

    document.getElementById("fullName").required = isSignup;
    confirmInput.required = isSignup;

    loginOptions.hidden = isSignup;

    passwordInput.autocomplete =
        isSignup
            ? "new-password"
            : "current-password";

    formTitle.textContent =
        isSignup
            ? "Create Your Account"
            : "Welcome Back!";

    formSubtitle.innerHTML =
        isSignup
            ? 'Already have an account? <a href="#" id="switchLink">Login here</a>'
            : 'Don\'t have an account? <a href="#" id="switchLink">Create one</a>';

    submitButton.textContent =
        isSignup
            ? "Create Account"
            : "Login to Your Account";


    document
        .getElementById("switchLink")
        .addEventListener("click", event => {

            event.preventDefault();

            setMode(
                currentMode === "login"
                    ? "signup"
                    : "login"
            );

        });
}


document.querySelectorAll(".mode-tab").forEach(button => {

    button.addEventListener("click", () => {

        setMode(button.dataset.mode);

    });

});


document
    .getElementById("switchLink")
    .addEventListener("click", event => {

        event.preventDefault();

        setMode("signup");

    });


function toggleVisibility(input, button) {

    const isHidden =
        input.type === "password";

    input.type =
        isHidden
            ? "text"
            : "password";

    button.textContent =
        isHidden
            ? "Hide"
            : "Show";
}


document
    .getElementById("togglePassword")
    .addEventListener("click", () => {

        toggleVisibility(
            passwordInput,
            document.getElementById("togglePassword")
        );

    });


document
    .getElementById("toggleConfirm")
    .addEventListener("click", () => {

        toggleVisibility(
            confirmInput,
            document.getElementById("toggleConfirm")
        );

    });


authForm.addEventListener("submit", async event => {

    event.preventDefault();

    clearMessage();

    const name =
        document
            .getElementById("fullName")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;


    // SIGN UP
    if (currentMode === "signup") {

        if (name.length < 2) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmInput.value) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";


        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            await updateProfile(
                userCredential.user,
                {
                    displayName: name
                }
            );


            showMessage(
                "Account created successfully! You can now login.",
                "success"
            );


            authForm.reset();

            setTimeout(() => {
                setMode("login");
            }, 1500);


        } catch (error) {

            console.error(
                "Signup error:",
                error
            );

            showMessage(
                getFirebaseError(error),
                "error"
            );

        } finally {

            submitButton.disabled = false;

            submitButton.textContent =
                "Create Account";
        }

        return;
    }


  
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";


    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        showMessage(
            "Login successful! Welcome back.",
            "success"
        );


        console.log(
            "Logged in user:",
            userCredential.user
        );


        // Home page par redirect
        setTimeout(() => {

            window.location.href =
                "./home.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showMessage(
            getFirebaseError(error),
            "error"
        );

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Login to Your Account";
    }

});


/* FORGOT PASSWORD */

document
    .getElementById("forgotPassword")
    .addEventListener("click", async event => {

        event.preventDefault();

        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        if (!email) {

            showMessage(
                "Enter your email address first to reset your password.",
                "error"
            );

            document
                .getElementById("email")
                .focus();

            return;
        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            showMessage(
                "Password reset email sent. Please check your inbox.",
                "success"
            );


        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );

            showMessage(
                getFirebaseError(error),
                "error"
            );

        }

    });


document.getElementById("googleLogin").addEventListener("click", async () => {

    clearMessage();

    try {

        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(
            auth,
            provider
        );

        const user = result.user;

        console.log("Google login successful:", user.email);

        showMessage(
            "Google login successful! Redirecting...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "home.html";
        }, 700);

    } catch (error) {

        console.error("Google login error:", error);

        if (error.code === "auth/popup-closed-by-user") {

            showMessage(
                "Google sign-in was cancelled.",
                "error"
            );

            return;
        }

        showMessage(
            error.message || "Google sign-in failed. Please try again.",
            "error"
        );

    }

});


document.getElementById("githubLogin").addEventListener("click", async () => {

    clearMessage();

    const provider = new GithubAuthProvider();

    try {

        if (auth.currentUser) {

            const result = await linkWithPopup(
                auth.currentUser,
                provider
            );

            showMessage(
                "GitHub account linked successfully!",
                "success"
            );

            console.log("GitHub linked:", result.user);

            return;
        }

        const result = await signInWithPopup(
            auth,
            provider
        );

        showMessage(
            "GitHub login successful! Welcome " +
            (result.user.displayName || result.user.email),
            "success"
        );

        setTimeout(() => {
            window.location.href = "./profile.html";
        }, 800);

    } catch (error) {

        console.error("GitHub login error:", error);

        if (
            error.code ===
            "auth/account-exists-with-different-credential"
        ) {

            const githubCredential =
                GithubAuthProvider.credentialFromError(error);

            if (!githubCredential) {

                showMessage(
                    "GitHub credential could not be received.",
                    "error"
                );

                return;
            }

            try {

                const googleProvider =
                    new GoogleAuthProvider();

                showMessage(
                    "Your account already exists with Google. Connecting GitHub...",
                    "success"
                );

                const googleResult =
                    await signInWithPopup(
                        auth,
                        googleProvider
                    );

                await linkWithCredential(
                    googleResult.user,
                    githubCredential
                );

                showMessage(
                    "GitHub account linked successfully!",
                    "success"
                );

                setTimeout(() => {
                    window.location.href =
                        "./profile.html";
                }, 1000);

            } catch (linkError) {

                console.error(
                    "GitHub linking error:",
                    linkError
                );

                showMessage(
                    linkError.message ||
                    "Could not link GitHub account.",
                    "error"
                );
            }

            return;
        }

        showMessage(
            error.message ||
            "GitHub login failed. Please try again.",
            "error"
        );
    }

});


setMode("login");