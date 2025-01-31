<template>
  <!-- Application principale avec image de fond -->
  <ion-app class="background-image">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="current" href="/current">
          <ion-icon :icon="thermometer"></ion-icon>
          <ion-label>Actuel</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="hourly" href="/hourly">
          <ion-icon :icon="time"></ion-icon>
          <ion-label>Par heure</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="daily" href="/daily">
          <ion-icon :icon="calendar"></ion-icon>
          <ion-label>Par jour</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/vue';
import { thermometer, time, calendar } from 'ionicons/icons';
</script>

<style scoped>
/* Classe pour l'image de fond */
.background-image {
  background-image: url('/imagemeteo.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
}
</style>
