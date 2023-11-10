<script setup lang="ts">
import { ref, onMounted,  } from 'vue';
import { authService } from '@/services/firebase.authservice';
import { useRouter } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { loadingController } from '@ionic/vue';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

interface Team {
  TeamName: string;
  Constructor: string;
  Driver1: string;
  Driver2: string;
  id: string;
  Motor: string;
  Points: string;
  TeamBoss: string;
  Image: String;
}

const teams = ref<Team[]>([]);
const currentUserData = ref<any>(null);
const router = useRouter();
const isLoading = ref(false)

const currentUser = () => {
  return authService.currentUser();
}

const login = () => {
  router.push('/authentication')
}

const newTeam = () => {
  router.push('/new-team')
}

const logout = async () => {
  try {
    await authService.logout();
    currentUserData.value = null;
  } catch (error) {
    console.log("Error logging out: ", error);
  }
};

const fetchTeams = async () => {
  isLoading.value = true;
  const loading = await loadingController.create({
    message: "Loading the teams",
    duration: 9
  });
  try {
    await loading.present()
    const querySnapshot = await getDocs(collection(db, 'FormulaTeams'));
    querySnapshot.forEach((doc) => {
      teams.value.push(doc.data() as Team);
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
  }finally{
    isLoading.value = false;
    await loading.dismiss();
  }
};

const refreshTeams = async(event: CustomEvent) => {
  await fetchTeams()
  event.target.complete();
}

onMounted(async () => {
  currentUserData.value = await currentUser();
  await fetchTeams();
});



</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Formula 1</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="newTeam">+</ion-button>
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
        
    <ion-content class="bg-blue-500 grid grid-cols-3 gap-4 p-4">
      <ion-refresher slot="fixed" @ionRefresh="refreshTeams($event)">
      <ion-refesh-content></ion-refesh-content>
      </ion-refresher>

      <router-link v-for="team in teams" :key="team.id" :to="'/detail/' + team.TeamName">
        <ion-card size="3">
          <ion-card-header>
            <ion-card-title>{{ team.TeamName }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Constructor: {{ team.Constructor }}</p>
            <p>Driver 1: {{ team.Driver1 }}</p>
            <p>Driver 2: {{ team.Driver2 }}</p>
            <p>ID: {{ team.id }}</p>
            <p>Motor: {{ team.Motor }}</p>
            <p>Points: {{ team.Points }}</p>
            <p>Team Boss: {{ team.TeamBoss }}</p>
            <img :src="team.Image" class="image">
          </ion-card-content>
        </ion-card>
      </router-link> 
</ion-content>
</ion-page>
</template>

<style scoped>
.content {
  height: 225px;
  width: 100%; /* Adjust the width as per your requirement */
}

.image{
  height: 100px;
  width: 100px;
}

</style>

