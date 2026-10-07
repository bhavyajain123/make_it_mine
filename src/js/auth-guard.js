import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";

console.log("Auth Guard Loaded");

onAuthStateChanged(auth, (user) => {

    console.log("Auth Guard User:", user);

    if (!user) {

        console.log("No user found. Redirecting to login...");

        window.location.replace(
            "/src/pages/login.html"
        );

        return;
    }

    console.log("User authenticated:", user.email);

});