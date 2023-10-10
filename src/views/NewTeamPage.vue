<script setup lang="ts">
import { ref } from 'vue'
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import {
    collection,
    getDocs
    getStorage,
    ref as dbRef,

} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { useRoute } from 'vue-router';

const router = useRoute();

const newTeam = ref({

})

</script>

<template>

</template>

<style scoped>

</style>