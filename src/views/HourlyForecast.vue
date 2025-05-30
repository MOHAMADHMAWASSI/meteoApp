<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prévisions horaires</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Affichage du mois actuel -->
      <div class="current-month">
        Mois: {{ currentMonth }}
      </div>
      <!-- Vérification de l'existence des données -->
      <ion-list v-if="weather" class="forecast-list">
        <!-- Itération sur les 24 heures -->
        <ion-item v-for="(temp, index) in weather.hourly.temperature_2m.slice(0, 24)" :key="index" class="forecast-item">
          <!-- Affichage de l'heure au format "HH:MM" -->
          <ion-label>
            {{ formatHour(weather.hourly.time[index]) }}
          </ion-label>
          <!-- Affichage de l'icône météo et de la température -->
          <ion-note slot="end">
            <ion-icon :icon="getWeatherIcon(weather.hourly.weather_code[index])" size="small"></ion-icon>
            {{ temp }}°C
          </ion-note>
        </ion-item>
      </ion-list>
      <!-- 🔹 Ajout d'un message d'erreur si les données sont absentes -->
      <ion-text v-else-if="errorMessage">
        <p class="error-message">{{ errorMessage }}</p>
      </ion-text>
      <ion-spinner v-else></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonSpinner, IonIcon, IonText } from '@ionic/vue';
import { WeatherService } from '@/services/WeatherService';
import { WeatherData } from '@/types/weather';
import { sunny, cloud, rainy, snow } from 'ionicons/icons'; // Icônes météo
import './HourlyForecast.css';

// Stocke les données météo
const weather = ref<WeatherData | null>(null);
const errorMessage = ref<string | null>(null);
const currentMonth = ref<string>('');

// Fonction pour formater l'heure (HH:MM)
const formatHour = (time: string) => {
  const date = new Date(time);
  return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
};

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

// Récupère les données météo lors du montage du composant
onMounted(async () => {
  try {
    weather.value = await WeatherService.getWeatherData();
    updateMonth();
  } catch (error) {
    console.error("Erreur lors du chargement des données météo", error);
    errorMessage.value = error instanceof Error ? error.message : "Impossible de charger les prévisions.";
  }
});

// Fonction pour mettre à jour le mois actuel
function updateMonth() {
  const now = new Date();
  currentMonth.value = now.toLocaleString('default', { month: 'long' });
}
</script>
