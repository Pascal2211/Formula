<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { authService } from '@/services/firebase.authservice';
import { useRouter } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';


interface Team {
  TeamName: string;
  Constructor: string;
  Driver1: string;
  Driver2: string;
  ID: string;
  Motor: string;
  Points: number;
  TeamBoss: string;
}

const teams = ref<Team[]>([]);
const currentUserData = ref<any>(null);
const router = useRouter();

const currentUser = () => {
  return authService.currentUser();
}

const login = () => {
  router.push('/authentication')
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
  try {
    const querySnapshot = await getDocs(collection(db, 'FormulaTeams'));
    querySnapshot.forEach((doc) => {
      teams.value.push(doc.data() as Team);
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

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
        
    <ion-content class="bg-blue-500 grid grid-cols-3 gap-4 p-4">
  <ion-card v-if="teams.length" v-for="(team, index) in teams" :key="index" class="text-white rounded-lg shadow-lg">
    <ion-card-header>
      <ion-card-title>{{ team.TeamName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p class="bg-sky-100">Constructor: {{ team.Constructor }}</p>
      <p class="text-black">Driver 1: {{ team.Driver1 }}</p>
      <p class="text-black">Driver 2: {{ team.Driver2 }}</p>
      <p class="text-black">ID: {{ team.ID }}</p>
      <p class="text-black">Motor: {{ team.Motor }}</p>
      <p class="text-black">Points: {{ team.Points }}</p>
      <p class="text-black">Team Boss: {{ team.TeamBoss }}</p>
    </ion-card-content>
  </ion-card>

  <ion-card v-else class="text-white rounded-lg shadow-lg">
    <ion-card-content>
      <p>Loading teams...</p>
    </ion-card-content>
  </ion-card>
</ion-content>
  </ion-page>
</template>

