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
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
