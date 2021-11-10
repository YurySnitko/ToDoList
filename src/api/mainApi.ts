import { database } from "./firebase";
import { child, get, push, ref, set } from "@firebase/database";
import { getToast } from "../lib/toast";

export const mainAPI = {
    createTaskKey(userId: string | null, date: string ) {
        return push(child(ref(database), `users/${userId}/tasks/${date}`)).key     
    }, 
    setTask(userId: string | null, date: string, key: string | null, taskData: object) {
        return set(ref(database, `users/${userId}/tasks/${date}/${key}`), taskData)
    },
    getTasks(userId: string | null)  {
        return get(child(ref(database), `users/${userId}/tasks/`))
            .then(snapshot => snapshot.exists() && snapshot.val())
            .catch(err => err && getToast(err));
    },
    updateTask(userId: string | null, date: string, taskId: string | null, taskData: object) {
        return set(ref(database, `users/${userId}/tasks/${date}/${taskId}`), taskData)
    }   
}