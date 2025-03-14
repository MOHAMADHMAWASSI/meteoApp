<!-- src/views/DailyForecast.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prévisions quotidiennes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Affichage du mois actuel -->
      <div class="current-month">
        Mois: {{ currentMonth }}
      </div>
      <!-- 🔹 Ajout d'une vérification stricte -->
      <ion-list v-if="weatherData && weatherData.daily" class="forecast-list">
        <ion-item v-for="(maxTemp, index) in weatherData.daily.temperature_2m_max" :key="index" class="forecast-item">
          <ion-label>
            {{ new Date(weatherData.daily.time[index]).toLocaleDateString() }}
          </ion-label>
          <ion-note slot="end">
            <ion-icon :icon="getWeatherIcon(weatherData.daily.weather_code[index])" size="small"></ion-icon>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonSpinner, IonText, IonIcon } from '@ionic/vue';
import { WeatherService } from '@/services/WeatherService';
import type { WeatherData } from '@/types/weather';
import { sunny, cloud, rainy, snow } from 'ionicons/icons'; // Icônes météo
import './DailyForecast.css';

const weatherData = ref<WeatherData | null>(null);
const errorMessage = ref<string | null>(null);
const currentMonth = ref<string>('');

// Fonction pour obtenir l'icône météo correspondante en fonction du code météo
const getWeatherIcon = (code: number) => {
  switch (code) {
    case 1: return sunny;
    case 2: return cloud;
    case 3: return rainy;
    case 4: return snow;
    default: return sunny; // Valeur par défaut
  }
};

onMounted(async () => {
  try {
    weatherData.value = await WeatherService.getWeatherData();
    console.log("✅ Données météo chargées :", weatherData.value); // 🔹 Vérifie les données
    updateMonth();
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des données météo :", error);
    errorMessage.value = error instanceof Error ? error.message : "Impossible de charger les prévisions.";
  }
});

// Fonction pour mettre à jour le mois actuel
function updateMonth() {
  const now = new Date();
  currentMonth.value = now.toLocaleString('default', { month: 'long' });
}
</script>
