<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Titre de la page météo -->
        <ion-title>Météo actuelle</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :style="{ backgroundImage: `url(${backgroundImage})` }">
      <!-- Affichage de la date et de l'heure actuelles -->
      <div class="current-datetime">
        {{ currentDateTime }}
      </div>
      <!-- Affichage du mois actuel -->
      <div class="current-month">
        Mois: {{ currentMonth }}
      </div>
      <!-- Si les données météo sont chargées, on affiche la carte avec les informations -->
      <transition name="fade">
        <ion-card v-if="weatherData" class="weather-card">
          <ion-card-header>
            <ion-card-title>
              <!-- L'icône qui change selon la météo avec animation -->
              <ion-icon :icon="weatherIcon" size="large" class="weather-icon" />
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
            <!-- Affichage de la visibilité si disponible -->
            <p v-if="weatherData.current.visibility">Visibilité: {{ weatherData.current.visibility }} km</p>
            <!-- Affichage de l'indice UV si disponible -->
            <p v-if="weatherData.current.uv_index">Indice UV: {{ weatherData.current.uv_index }}</p>
          </ion-card-content>
        </ion-card>
        <!-- Si les données météo ne sont pas encore chargées, on affiche un spinner -->
        <ion-spinner v-else></ion-spinner>
      </transition>
      <!-- Affichage du message d'erreur si une erreur se produit -->
      <div v-if="error" class="error-message">{{ error }}</div>
      <!-- Affichage des prévisions météorologiques -->
      <div v-if="forecastData" class="forecast">
        <h2>Prévisions</h2>
        <div v-for="day in forecastData.daily" :key="day.date" class="forecast-day">
          <p>{{ day.date }}: {{ day.temperature }}°C, {{ day.weather_description }}</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';  // Importation des fonctions de Vue.js
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonSpinner } from '@ionic/vue';  // Importation des composants d'Ionic
import { WeatherService } from '../services/WeatherService';  // Service pour récupérer les données météo
import type { WeatherData, ForecastData } from '../types/weather';  // Type pour définir la structure des données météo
import { sunny, cloud, rainy, snow } from 'ionicons/icons';  // Icônes pour différentes conditions météorologiques

// Variable pour stocker les données météo récupérées
const weatherData = ref<WeatherData | null>(null);

// Variable pour stocker les prévisions météorologiques
const forecastData = ref<ForecastData | null>(null);

// Variable pour stocker la date et l'heure actuelles
const currentDateTime = ref<string>('');

// Variable pour stocker le mois actuel
const currentMonth = ref<string>('');

// Variable pour stocker les erreurs
const error = ref<string | null>(null);

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
    // Récupérer les prévisions météorologiques via le service WeatherService
    forecastData.value = await WeatherService.getForecastData();
    // Mettre à jour la date et l'heure actuelles
    updateDateTime();
    setInterval(updateDateTime, 60000);  // Mettre à jour chaque minute
    // Mettre à jour le mois actuel
    updateMonth();
  } catch (err) {
    console.error('Error loading weather data:', err);  // Afficher une erreur si la récupération échoue
    error.value = 'Erreur lors du chargement des données météo. Veuillez réessayer plus tard.';
  }
});

// Fonction pour mettre à jour la date et l'heure actuelles
function updateDateTime() {
  const now = new Date();
  currentDateTime.value = now.toLocaleString();
}

// Fonction pour mettre à jour le mois actuel
function updateMonth() {
  const now = new Date();
  currentMonth.value = now.toLocaleString('default', { month: 'long' });
}
</script>

<style scoped>
/* Stylisation du contenu avec l'image de fond */
ion-content {
  background-size: cover;  /* L'image couvre tout l'écran */
  background-position: center;  /* L'image est centrée */
  padding: 20px;  /* Un peu d'espace autour du contenu */
}

/* Stylisation de la date et de l'heure actuelles */
.current-datetime {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 10px;
  color: white;
}

/* Stylisation du mois actuel */
.current-month {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 20px;
  color: white;
}

/* Animation pour l'icône météo */
.weather-icon {
  animation: rotate 2s linear infinite;
}

/* Transition pour les changements de météo */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Stylisation du message d'erreur */
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

/* Stylisation des prévisions météorologiques */
.forecast {
  margin-top: 20px;
  color: white;
}
.forecast-day {
  margin-bottom: 10px;
}

/* Stylisation des cartes météo */
.weather-card {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
