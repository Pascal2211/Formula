<script setup lang="ts">
import { add, trashOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { getCurrentScope, ref } from 'vue';
import { collection, doc, getFirestore,setDoc, } from 'firebase/firestore';
import { getStorage, uploadBytes, getDownloadURL, ref as dbRef } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from 'firebase/auth';

import { toastController } from '@ionic/vue';

import { useRouter } from 'vue-router';
import {INewFormulaTeam} from "@/models/FormulaTeamsModels";

const auth = getAuth();


const router = useRouter();

const newTeam = ref<INewFormulaTeam>({
    TeamName: "",
    Constructor: "",
    Driver1: "",
    Driver2: "",
    id: "",
    Motor: "",
    Points:  "",
    TeamBoss: "",
    Image: [],
});



const formulaTeamCollection = collection(getFirestore(), "FormulaTeams");

const postNewFormulaTeam = async () => {
    const user = auth.currentUser;
    if(!user){
        router.replace('/authentication');
        console.log(user)
        return;
    }

    if(newTeam.value.Image.length === 0) {
        alert("Du må laste opp minst ett bilde");
        return;
    }

    try{
        
        const newImageUrls =  [];
        for(const imageUrl of newTeam.value.Image) {

            const imageName = new Date().getTime() + '.jpg';
            const storageRef = getStorage();
            const imageRef = dbRef(storageRef, `Image/${imageName}`);
            const respone = await fetch(imageUrl);
            const imageBlob = await respone.blob();
            const snapshot = await uploadBytes(imageRef, imageBlob);
            const url = await getDownloadURL(snapshot.ref);
            newImageUrls.push(url);
        }
        newTeam.value.Image = newImageUrls;
        
        await setDoc(doc(formulaTeamCollection, ), newTeam.value);
        const successToast = await toastController.create({
            message: 'Laget ble opprettet',
            duration: 1500,
            position: 'bottom',
            color: 'success'
        });

        await successToast.present();
        router.replace('/home');

    } catch (error) {
        const errorToast = await toastController.create({
            message: 'You dumbass, teamet ble ikke laget',
            duration: 25000,
            position: 'bottom',
            color: 'danger'
        });

        await errorToast.present();
        console.log(error);
    }
}



// const triggerCamera = async () => {
//     const photo = await Camera.getPhoto({
//         quality: 100,
//         allowEditing: false,
//         resultType: CameraResultType.Uri,
//     });
//     if (photo.webPath) {
//         newTeam.value.Image.push(photo.webPath);
//     }
// };

const triggerCamera = async () => {
    try {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri,
        });

        if (image.webPath) {
            newTeam.value.Image.push(image.webPath);
        }
    } catch (error) {
        console.log(error);
    }
};

const removeImagePreview = (index) => {
    if(index >= 0 && index < newTeam.value.Image.length) {
        newTeam.value.Image.splice(index, 1);
    }
}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Legge til et nytt lag</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
        
            <ion-list>
                <ion-button @click="triggerCamera" class="image-picker" color="light">
                    Velg en fil å hente et bilde fra
                </ion-button>

                <section v-if="newTeam.Image.length">
                    <div v-for="(image, index) in newTeam.Image" :key="index">
                        <img :src="image" />
                        <ion-button @click="() => removeImagePreview(index)" fill="default" class="remove-image-preview">
                            <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
                        </ion-button>
                    </div>
                </section>

                <ion-button @click="postNewFormulaTeam" class="button-add" fill="solid" color="dark" size="default">
                    Send inn teamet
                </ion-button>

                <ion-item>
                    <ion-label class="label-mid" position="floating">TeamName</ion-label>
                    <ion-input type="text" v-model="newTeam.TeamName"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">Constructor</ion-label>
                    <ion-input type="text" v-model="newTeam.Constructor"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">Driver1</ion-label>
                    <ion-input type="text" v-model="newTeam.Driver1"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">Driver2</ion-label>
                    <ion-input type="text" v-model="newTeam.Driver2"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">Motor</ion-label>
                    <ion-input type="text" v-model="newTeam.Motor"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">points</ion-label>
                    <ion-input type="text" v-model="newTeam.Points"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">id</ion-label>
                    <ion-input type="text" v-model="newTeam.id"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mid" position="floating">TeamBoss</ion-label>
                    <ion-input type="text" v-model="newTeam.TeamBoss"></ion-input>
                </ion-item>


            </ion-list>
        </ion-content>

    </ion-page>
</template>

<style scoped>

</style>