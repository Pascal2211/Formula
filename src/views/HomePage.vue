<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from '@ionic/vue';
import { ref, onMounted } from 'vue'
import { authService } from '@/services/firebase.authservice';
import { useRouter } from 'vue-router';
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const currentUserData = ref(null);
const database = getFirestore();
const formulaTeams = ref([]);
const router = useRouter();

const currentUser = () => {
  return authService.currentUser();
}

const login = () => {
  router.push('/authentication')
}

const logout = async () => {
  try{
    await authService.logout();
    currentUserData.value = null;
  }catch (error) {
    console.log("Error logging out: ", error);
  }
};

onIonViewDidEnter(async () => {
  currentUserData.value = await currentUser();
  fetchFormulaTeams();
})

const refreshFormulaTeamView = async (event: CustomEvent) => {
  await fetchFormulaTeams();
  event.target.complete();
}

const fetchFormulaTeams = (async () => {
  const results: any[] = [];
  const formulaTeamsSnap = await getDocs(collection(database, "formulaTeams"));
  formulaTeamsSnap.forEach((doc) => {
    results.push({id: doc.id, ...doc.data()});
  });

  formulaTeams.value = [...results]

})


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

    <ion-content :fullscreen="true">
        <ion-refresher slot="fixed" @ionRefresh="refreshFormulaTeamView($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ion-card v-for="team in formulaTeams" :key="team.id" :router-link="'/detail/' + team.id">
          <ion-card-header>
            <ion-card-subtitle>{{ team.motor }}</ion-card-subtitle>
          </ion-card-header>

        
        </ion-card>
    </ion-content>
  </ion-page>
</template>
