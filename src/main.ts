import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { initializeApp } from "firebase/app";


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
//Bytt ut 2 med 4
const firebaseConfig = {
  apiKey: "AIzaSyBufYAA0xdS4G5A6W5aOpowqHSBNj4dLH4",
  authDomain: "formula-30243.firebaseapp.com",
  projectId: "formula-30243",
  storageBucket: "formula-30243.appspot.com",
  messagingSenderId: "839518724587",
  appId: "1:839518724587:web:42154e6a3e3fc5b90839ae"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});