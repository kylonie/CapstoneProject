import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const isAuthenticated = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user){
        return false
    }
    return true;
}
