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

      <!-- Sélection de la ville -->
      <ion-item>
        <ion-label>Ville:</ion-label>
        <ion-select v-model="selectedCity" @ionChange="loadWeatherData">
          <ion-select-option v-for="city in cities" :key="city" :value="city">{{ city }}</ion-select-option>
        </ion-select>
      </ion-item>

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
            <!-- Affichage du lever et coucher du soleil -->
            <p v-if="sunriseTime">Lever du soleil: {{ sunriseTime }}</p>
            <p v-if="sunsetTime">Coucher du soleil: {{ sunsetTime }}</p>
            <!-- Affichage de la phase de la lune -->
            <p v-if="moonPhase">Phase de la lune: {{ moonPhase }}</p>
          </ion-card-content>
        </ion-card>
      </transition>
      <!-- Si les données météo ne sont pas encore chargées, on affiche un spinner -->
      <ion-spinner v-if="!weatherData"></ion-spinner>
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
import { ref, onMounted, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonSpinner, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { WeatherService } from '../services/WeatherService';
import type { WeatherData, ForecastData } from '../types/weather';
import { sunny, cloud, rainy, snow } from 'ionicons/icons';
import './CurrentWeather.css'; // Import du fichier CSS

// Définir les villes supportées
const cities = ref(['Paris', 'London', 'New York']);
const selectedCity = ref('Paris');

// Variables pour stocker les données météo récupérées
const weatherData = ref<WeatherData | null>(null);
const forecastData = ref<ForecastData | null>(null);
const currentDateTime = ref<string>('');
const currentMonth = ref<string>('');
const error = ref<string | null>(null);

// Variables pour stocker les informations sur le lever et coucher du soleil et la phase de la lune
const sunriseTime = ref<string | null>(null);
const sunsetTime = ref<string | null>(null);
const moonPhase = ref<string | null>(null);

// Computed property pour déterminer l'icône météo en fonction des données
const weatherIcon = computed(() => {
  if (!weatherData.value) return sunny;
  const code = weatherData.value.current.weather_code;
  switch (code) {
    case 1: return sunny;
    case 2: return cloud;
    case 3: return rainy;
    case 4: return snow;
    default: return sunny;
  }
});

// Computed property pour déterminer l'image de fond en fonction des données météo
const backgroundImage = computed(() => {
  if (!weatherData.value) return 'url(/images/default-bg.jpg)';
  const code = weatherData.value.current.weather_code;
  switch (code) {
    case 1: return 'url(/images/sunny-bg.jpg)';
    case 2: return 'url(/images/cloudy-bg.jpg)';
    case 3: return 'url(/images/rainy-bg.jpg)';
    case 4: return 'url(/images/snowy-bg.jpg)';
    default: return 'url(/images/default-bg.jpg)';
  }
});

// Fonction pour charger les données météo
const loadWeatherData = async () => {
  try {
    weatherData.value = await WeatherService.getWeatherData(selectedCity.value);
    forecastData.value = await WeatherService.getForecastData(selectedCity.value);
    updateDateTime();
    updateMonth();

    // Simuler les données de lever et coucher du soleil et de la phase de la lune
    sunriseTime.value = '06:00';
    sunsetTime.value = '18:00';
    moonPhase.value = 'Pleine lune';

  } catch (err) {
    console.error('Error loading weather data:', err);
    error.value = 'Erreur lors du chargement des données météo. Veuillez réessayer plus tard.';
  }
};

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

// Charger les données météo au montage du composant
onMounted(() => {
  loadWeatherData();
  setInterval(updateDateTime, 60000);
});
</script>
