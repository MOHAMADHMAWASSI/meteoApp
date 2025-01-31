<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Titre de la page météo -->
        <ion-title>Météo actuelle</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :style="{ backgroundImage: `url(${backgroundImage})` }">
      <!-- Si les données météo sont chargées, on affiche la carte avec les informations -->
      <ion-card v-if="weatherData">
        <ion-card-header>
          <ion-card-title>
            <!-- L'icône qui change selon la météo -->
            <ion-icon :icon="weatherIcon" size="large" />
            <!-- Affiche la température actuelle -->
            {{ weatherData.current.temperature_2m }}°C
          </ion-card-title>
          <ion-card-subtitle>
            <!-- Affiche l'humidité actuelle -->
            Humidité: {{ weatherData.current.relative_humidity_2m }}%
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <!-- Affichage du vent si disponible -->
          <p v-if="weatherData.current.wind_speed_10m">Vent: {{ weatherData.current.wind_speed_10m }} km/h</p>
          <!-- Affichage de la pression si disponible -->
          <p v-if="weatherData.current.pressure_msl">Pression: {{ weatherData.current.pressure_msl }} hPa</p>
        </ion-card-content>
      </ion-card>

      <!-- Si les données météo ne sont pas encore chargées, on affiche un spinner -->
      <ion-spinner v-else></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';  // Importation des fonctions de Vue.js
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonSpinner } from '@ionic/vue';  // Importation des composants d'Ionic
import { WeatherService } from '../services/WeatherService';  // Service pour récupérer les données météo
import type { WeatherData } from '../types/weather';  // Type pour définir la structure des données météo
import { sunny, cloud, rainy, snow } from 'ionicons/icons';  // Icônes pour différentes conditions météorologiques

// Variable pour stocker les données météo récupérées
const weatherData = ref<WeatherData | null>(null);

// Computed property pour déterminer l'icône météo en fonction des données
const weatherIcon = computed(() => {
  if (!weatherData.value) return sunny;  // Si aucune donnée, icône par défaut (ensoleillé)
  const code = weatherData.value.current.weather_code;  // Code représentant le type de météo
  switch (code) {
    case 1: return sunny;  // Ensoleillé
    case 2: return cloud;  // Nuageux
    case 3: return rainy;  // Pluvieux
    case 4: return snow;   // Neigeux
    default: return sunny; // Si code non reconnu, icône par défaut (ensoleillé)
  }
});

// Computed property pour déterminer l'image de fond en fonction des données météo
const backgroundImage = computed(() => {
  if (!weatherData.value) return 'url(/images/default-bg.jpg)';  // Image par défaut si aucune donnée météo
  const code = weatherData.value.current.weather_code;  // Code représentant le type de météo
  switch (code) {
    case 1: return 'url(/images/sunny-bg.jpg)';  // Image pour le temps ensoleillé
    case 2: return 'url(/images/cloudy-bg.jpg)'; // Image pour le temps nuageux
    case 3: return 'url(/images/rainy-bg.jpg)';  // Image pour le temps pluvieux
    case 4: return 'url(/images/snowy-bg.jpg)';  // Image pour le temps neigeux
    default: return 'url(/images/default-bg.jpg)';  // Image par défaut si code non reconnu
  }
});

// Fonction pour charger les données météo lorsque le composant est monté
onMounted(async () => {
  try {
    // Récupérer les données météo via le service WeatherService
    weatherData.value = await WeatherService.getWeatherData();
  } catch (error) {
    console.error('Error loading weather data:', error);  // Afficher une erreur si la récupération échoue
  }
});
</script>

<style scoped>
/* Stylisation du contenu avec l'image de fond */
ion-content {
  background-size: cover;  /* L'image couvre tout l'écran */
  background-position: center;  /* L'image est centrée */
  padding: 20px;  /* Un peu d'espace autour du contenu */
}
</style>
