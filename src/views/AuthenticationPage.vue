<script setup lang="ts">
import { authService } from '@/services/firebase.authservice';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inRegisterMode = ref(false)
const userDetails = ref({
    firstName: '',
    email: '',
    password: ''
});

const login = async () => {
    try {
        await authService.login(useDetails.value.email, userDetails.value.password);
        router.replace('/home');
    } 
    catch(error){
        console.log(error);
    }
}

const register = async () => {
    try{
        await authService.register(userDetails.value.email, userDetails.value.password);
        await login()
    } catch (error) {
        console.log(error);
    }
}

const logout = async () => {
    try {
        await authService.logout();
        router.replace('/home');
    } catch(error) {
        console.error(error);
    }
}

</script>

<template>
    <ion-page>
        <ion-content>
            <ion-list>
                <ion-list-header>
                    <ion-label>Label</ion-label>
                </ion-list-header>

                <ion-item lines="none">
                    <ion-label>Ny bruker?</ion-label>
                    <ion-toggle color="blue" @ion-change="inRegisterMode = !inRegisterMode"></ion-toggle>
                </ion-item>

                <Hr />

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
                    Registrer deg 🏕
                </ion-button>

                <ion-button v-else @click="login"  class="button-auth" fill="solid" color="dark" size="default">
                    Logg inn 🏕
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