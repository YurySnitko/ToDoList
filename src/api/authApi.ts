import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { auth, database } from "./firebase";
import { ref, set } from "@firebase/database";
import { getToast } from "../lib/toast";

const setUserEmail = (userId: string, email: string) => {
    set(ref(database, `users/${userId}`), {email: email})
}

export const authAPI = {
    signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(res => res.user && setUserEmail(res.user.uid, email))
            .catch((err) => err && getToast(err));
    },
    login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(res => res.user)
            .catch((err) => err && getToast(err));
    },
    logout() {
        return auth.signOut()
            .catch((err) => err && getToast(err));
    }
}