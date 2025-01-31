<!-- src/views/DailyForecast.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prévisions quotidiennes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- 🔹 Ajout d'une vérification stricte -->
      <ion-list v-if="weatherData && weatherData.daily">
        <ion-item v-for="(maxTemp, index) in weatherData.daily.temperature_2m_max" :key="index">
          <ion-label>
            {{ new Date(weatherData.daily.time[index]).toLocaleDateString() }}
          </ion-label>
          <ion-note slot="end">
            {{ weatherData.daily.temperature_2m_min[index] }}°C - {{ maxTemp }}°C
          </ion-note>
        </ion-item>
      </ion-list>
      
      <!-- 🔹 Ajout d'un message d'erreur si les données sont absentes -->
      <ion-text v-else-if="errorMessage">
        <p class="error-message">{{ errorMessage }}</p>
      </ion-text>

      <!-- 🔹 Ajout d'un spinner en attendant le chargement -->
      <ion-spinner v-else></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonSpinner, IonText } from '@ionic/vue';
import { WeatherService } from '@/services/WeatherService';
import type { WeatherData } from '@/types/weather';

const weatherData = ref<WeatherData | null>(null);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  try {
    weatherData.value = await WeatherService.getWeatherData();
    console.log("✅ Données météo chargées :", weatherData.value); // 🔹 Vérifie les données
  } catch (error: unknown) {
    console.error(" Erreur lors de la récupération des données météo :", error);
    errorMessage.value = error instanceof Error ? error.message : "Impossible de charger les prévisions.";
  }
});
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
