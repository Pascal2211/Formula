<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { IFormulaTeams } from "@/models/FormulaTeamsModels";

const db = getFirestore();
const route = useRoute();
const id = ref<string>(route.params.id); // Corrected id extraction
const team = ref<IFormulaTeams | null>(null);

onMounted(async () => {
  await fetchTeam();
});

const fetchTeam = async () => {
  try {
    const docRef = doc(db, "FormulaTeams", id.value); // Updated collection name
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      team.value = docSnap.data() as IFormulaTeams;
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
      <ion-card v-if="formulaTeams" class="text-white roundeded-lg shadow-lg">
        <ion-card-header>
          <ion-card-title>{{ formulaTeams.TeamBoss }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Driver 1:</ion-label>
            <ion-text>{{ formulaTeams.Driver1 }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Driver 2:</ion-label>
            <ion-text>{{ formulaTeams.Driver2 }}</ion-text>
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