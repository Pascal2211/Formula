<script setup lang="ts">

import { IonModal, IonTextarea, IonBackButton, IonButton, IonAvatar, IonText, IonIcon, IonItem, IonListHeader, IonLabel, IonList, IonCardHeader, IonCardSubtitle, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { ref } from 'vue';
import { useRoute } from "vue-router";
import NewTeamPage from "./NewTeamPage.vue";

const route = useRoute();
const { id } = route.params;
const currentUserData = ref(null);

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Baal 🏕</ion-title>
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
    </ion-page>

    <ion-content class="bg-blue-500 grid grid-cols-3 gap-4 p-4">
  <ion-card v-if="teams"  :key="team.ID" :router-link="'/detail/' + team.ID" class="text-white rounded-lg shadow-lg">
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
    
</template>
