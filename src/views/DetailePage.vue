<script setup lang="ts">

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{campingSpot.title}} ({{id}})</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="isModalOpen = true">
            <ion-icon :icon="chatboxOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <!-- Hero image section -->
      <img :alt="campingSpot.title" :src="campingSpot.imageURL" />

      <!-- Hashtag section -->
      <ion-chip v-for="hashtag in campingSpot.hashtags" :key="hashtag" color="tertiary">#{{hashtag}}</ion-chip>

      <!-- Camping spot info section -->
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Turbeskrivelse</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{campingSpot.description}}
        </ion-card-content>
      </ion-card>

      <!-- Comment section -->
      <ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>
              Kommentarfelt
              <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-label>
          </ion-list-header>
          <ion-item v-for="comment in campingSpot.comments" :key="comment.id" lines="none">
            <ion-avatar slot="start">
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==">
            </ion-avatar>
            <ion-label class="ion-text-wrap">
              <ion-text>
                <b>{{comment.username}} </b>
              </ion-text>
              <ion-text>
                <p>{{comment.text}}</p>
              </ion-text>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-modal 
        :is-open="isModalOpen" 
        :initial-breakpoint="0.25"
        :breakpoints="[0, 0.25, 0.5, 0.75]"
        @did-dismiss="isModalOpen = false">
          <ion-content>
            <ion-item lines="none">
              <ion-label position="floating">Ny kommentar</ion-label>
              <ion-textarea v-model="newCommentText"></ion-textarea>
              <ion-button @click="addNewComment">Legg til kommentar</ion-button>
            </ion-item>
          </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>