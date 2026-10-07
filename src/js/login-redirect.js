import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.replace(
            "/src/pages/home.html"
        );

    }

});