<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from '@ionic/vue';
import { ref, onMounted } from 'vue'
import { authService } from '@/services/firebase.authservice';
import { useRouter } from 'vue-router';

import { defineComponent } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const currentUserData = ref(null);
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
  fetchTeams();
})


export default defineComponent({
  data() {
    return {
      teams: [] as Array<any>, // Change the type to match your team structure
    };
  },
  methods: {
    async fetchTeams() {
      try {
        const querySnapshot = await getDocs(collection(db, 'FormulaTeams'));
        querySnapshot.forEach((doc) => {
          this.teams.push(doc.data());
        });
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
  },
  async created() {
    await this.fetchTeams();
  },
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
        
    <ion-content>
  <ion-card v-if="teams.length" v-for="(team, index) in teams" :key="index">
    <ion-card-header>
      <ion-card-title>{{ team.TeamName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p><strong>Constructor:</strong> {{ team.Constructor }}</p>
      <p><strong>Driver 1:</strong> {{ team.Driver1 }}</p>
      <p><strong>Driver 2:</strong> {{ team.Driver2 }}</p>
      <p><strong>ID:</strong> {{ team.ID }}</p>
      <p><strong>Motor:</strong> {{ team.Motor }}</p>
      <p><strong>Points:</strong> {{ team.Points }}</p>
      <p><strong>Team Boss:</strong> {{ team.TeamBoss }}</p>
    </ion-card-content>
  </ion-card>

  <ion-card v-else>
    <ion-card-content>
      <p>Loading teams...</p>
    </ion-card-content>
  </ion-card>
</ion-content>
  </ion-page>
</template>
