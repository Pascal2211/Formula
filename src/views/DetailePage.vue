<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();
const route = useRoute();
const teamName = ref<string>(Array.isArray(route.params.teamName) ? route.params.teamName[0] : route.params.teamName); // Check if route.params.teamName is an array
const team = ref(null);
const isLoadingTeam = ref(true)

onMounted(async () => {
  await fetchTeam();
});

const fetchTeam = async () => {
  try {
    const docRef = doc(db, "FormulaTeams", teamName.value); // Use teamName instead of id
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap);
      team.value = docSnap.data();
      isLoadingTeam.value = false;
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};

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
      <ion-card v-if="team" class="">
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

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the height to 100% of the viewport height to center vertically */
}

/* Style for the square */
ion-card {
  width: 400px; /* Set the width of the square */
  height: 400px; /* Set the height of the square */
  background-color: #3498db; /* Blue color for the background */
  color: rgb(244, 28, 28); /* White text color */
  text-align: center;
  border-radius: 10px; /* Optional: Add rounded corners */
}

/* Override the default text color for ion-card-title and ion-card-content */
ion-card-title,
ion-card-content {
  color: rgb(0, 0, 0);
}

</style>