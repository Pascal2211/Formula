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
      <!-- Header content -->
    </ion-header>

    <ion-content class="content">
      <ion-card v-if="team" class="text-white roundeded-lg shadow-lg">
        <ion-card-header>
          <ion-card-title>{{ team.Driver2 }}</ion-card-title>
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

.content{
  height: 200px;
  width: 300px;
}

</style>