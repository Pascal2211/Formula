import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const authService = {
    async register(email: string, password: string){
        const userCredentail = await createUserWithEmailAndPassword(getAuth(), email, password)
        return userCredentail?.user;
    },
    
    async login(email: string, password: string ){
        const userCredentail = await signInWithEmailAndPassword(getAuth(), email, password)
        return userCredentail?.user;
    },

    async logout(){
        return await signOut(getAuth());
    },

    async currentUser(){
        return await getAuth().currentUser;
    },

}