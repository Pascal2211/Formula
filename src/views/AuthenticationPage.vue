<script setup lang="ts">
import { authService } from '@/services/firebase.authservice';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToggle } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, getIdToken  } from 'firebase/auth';


const auth = getAuth();

const router = useRouter();
/* State */

// The user can toggle between login and register mode in the form to show/hide additional fields
const inRegisterMode = ref(false);

// Provides two-way data binding between Vue and the input fields in the form
const userDetails = ref({
    firstName: '',
    email: '',
    password: ''
});

const login = async () => {
    try{
        const user = await authService.login(userDetails.value.email, userDetails.value.password);
        const idToken = await user.getIdToken(true);
        localStorage.setItem("Loginn token", idToken)
        router.replace('/home')
    } catch (error) {
        console.log(error)
    }
}



const register = async () => {
    try {
        await authService.register(userDetails.value.email, userDetails.value.password);
        await login();
    } catch (error) {
        console.log(error);
    }
}


const googleLogin =  async () => {
    try {
        const user = await authService.signInWithGoogle();
        const idToken = user.accessToke;
        localStorage.setItem("Auth_Token: ", idToken)
        router.replace('/home')
    } catch (error) {
        console.log(error)
    }
}

// const signInWithGoogle = async ()=>{
//     try {
//         await authService.signInWithGoogle();
//         router.replace('/home');
//     } catch (error) {
//         console.log(error);
//     }
// }

const logout = async () => {
    try {
        await authService.logout();     
        router.replace('/home');

    } catch (error) {
        console.error(error);
    }
}
</script>
    
<template>
    <ion-page>
        <ion-content>
            <ion-list>
                <ion-list-header>
                    <ion-label>Baal</ion-label>
                </ion-list-header>

                <ion-item lines="none">
                    <ion-label class="label-mild">Ny bruker?</ion-label>
                    <ion-toggle color="dark" @ion-change="inRegisterMode = !inRegisterMode"></ion-toggle>
                </ion-item>

                <hr />

                <ion-item v-if="inRegisterMode">
                    <ion-label class="label-mild" position="floating">Fornavn</ion-label>
                    <ion-input v-model="userDetails.firstName"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Email</ion-label>
                    <ion-input type="email" v-model="userDetails.email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Passord</ion-label>
                    <ion-input type="password" v-model="userDetails.password"></ion-input>
                </ion-item>

                <ion-button v-if="inRegisterMode" @click="register" class="button-auth" fill="solid" color="dark" size="default">
                    Registrer deg 🏎️
                </ion-button>

                <ion-button v-else @click="login"  class="button-auth" fill="solid" color="dark" size="default">
                    Logg inn 🏎️🏎️
                </ion-button>

                <ion-button @click="googleLogin" class="button-auth" fill="solid" color="dark" size="default">
                    Logg inn med Google
                </ion-button>

            </ion-list>

        </ion-content>
    </ion-page>
</template>
    
<style scoped>
ion-content {
    --ion-background-color: #f4f4f4;
    display: flex;
}

ion-list {
    display: flex;
    flex-direction: column;
}

.label-mild {
    --color: #8a8a8a !important;
}

.hero-image {
    width: 80vw;
    align-self: center;
}

.button-auth {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
