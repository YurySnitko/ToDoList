import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "@firebase/auth";
import { auth, database } from "./firebase";
import { toast } from "react-toastify";
import { ref, set } from "@firebase/database";

// type SignUpDataType = {
//     email: string
//     password: string
// }

const setUserEmail = (userId: string, email: string) => {
    set(ref(database, 'users/' + userId), {email: email})
}

export const authAPI = {
    signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                if (res.user) setUserEmail(res.user.uid, email)
            })
            .catch((err) => {
                if (err) {
                    toast(err.message, {
                        className: "error-toast",
                        draggable: true,
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            });
    },
    login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(res => res.user)
            .catch((err) => {
                if (err) {
                    toast(err.message, {
                        className: "error-toast",
                        draggable: true,
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
    },
    logout() {
        return auth.signOut()
            .catch((err) => {
                if (err) {
                    toast(err.message, {
                        className: "error-toast",
                        draggable: true,
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
    }
    
            //set(ref(database, 'users/' + data.user.uid), {email: data.user.email});
          
    
}