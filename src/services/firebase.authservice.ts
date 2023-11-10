import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
  } from "firebase/auth";

  export const authService = {
    async register(email: string, password: string) {
      const userCredential =  await createUserWithEmailAndPassword(getAuth(), email, password)      
      return userCredential?.user;
    },
    async login(email: string, password: string) {
      const userCredential =  await signInWithEmailAndPassword(getAuth(), email, password)
      return userCredential?.user;
    },
    async logout() {
      return await signOut(getAuth());
    },
    async currentUser() {
      return await getAuth().currentUser;
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(getAuth(), provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return user;
      } catch(error) {
        console.error("You did a fucking mistake logging inn with google, now i have all your information: ", error);
        return null
      }
    }

  };