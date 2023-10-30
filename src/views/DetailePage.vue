<script setup lang="ts">
import { IonModal, IonSpinner, IonTextarea, IonBackButton, IonButton, IonAvatar, IonText, IonIcon, IonItem, IonListHeader, IonLabel, IonList, IonCardHeader, IonCardSubtitle, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from "@ionic/vue";import { ref } from 'vue';
import { chatboxOutline, arrowBack, trash } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { IFormulaTeamResponse } from "@/models/FormulaTeamsModels"
import { db } from "@/firebase";


const route = useRoute()
const { id } = route.params;
const router = useRouter();
const formulaTeams = ref<IFormulaTeamResponse.formula_teams_by_id | null>(null);
const isLoadingFormulaTeam = ref(true);



onIonViewDidEnter(() => {
  fetchTeams();
})

const fetchTeams = async () => {
  try {
    const docRef = doc(db, "FormulaTeams", id); // Use 'id' instead of 'formula_team.id'
    console.log("Document ID:", id); // Use 'id' instead of 'ID'
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const formula_team = docSnap.data(); // Remove the initial declaration of formula_team
      formulaTeams.value = formula_team;
      isLoadingFormulaTeam.value = false;
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};



// const team = ref< Team | null>(null);

// interface Team {
//   TeamName: string;
//   Constructor: string;
//   Driver1: string;
//   Driver2: string;
//   ID: string;
//   Motor: string;
//   Points: string;
//   TeamBoss: string
// }

// onMounted(async () => {
//   try{
//     const docRef = db.collection('FormulaTeams').doc(id);
//     const doc = await docRef.get();
//     if(doc.exists){
//       team.value = doc.data() as Team;
//     }else {
//       console.log("No such document ")
//     }
//   }catch(error) {
//     console.error("Error fetching document: ", error)
//   }
// })



</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Formula 1</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/new-spot">+</ion-button>
          <ion-button class="button-auth" fill="solid" color="dark" size="default" @click="login">
            Logg inn
          </ion-button> 
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
          <div class="user-info">
            <ion-subtitle v-if="currentUserData" class="flex-container">
                <span class="user-email">Logged in User: {{ currentUserData.email }}</span>
                <ion-button @click="logout" size="small" fill="clear" class="logout-btn">Logout</ion-button>
            </ion-subtitle>
            <ion-subtitle v-else>You haven't logged in</ion-subtitle>
          </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="content">
      <ion-card v-if="t" class="text-white roundeded-lg shadow-lg">
        <ion-card-header>
          <ion-card-title>{{ formulaTeams.TeamBoss }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Driver 1:</ion-label>
            <ion-text>{{ team.Driver1 }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Driver 2:</ion-label>
            <ion-text>{{ team.Driver2 }}</ion-text>
          </ion-item>
          <!-- Add more ion-item components for other details -->
        </ion-card-content>
      </ion-card>

      <ion-card v-else class="text-white rounded-lg shadow-lg">
        <ion-card-content>
          <p>Loading team details...</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>