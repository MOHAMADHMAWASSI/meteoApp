<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Prévisions horaires</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Vérification de l'existence des données -->
      <ion-list v-if="weather">
        <!-- Itération sur les 24 heures -->
        <ion-item v-for="(temp, index) in weather.hourly.temperature_2m.slice(0, 24)" :key="index">
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
      <ion-spinner v-else></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonSpinner, IonIcon } from '@ionic/vue';
import { WeatherService } from '@/services/WeatherService';
import { WeatherData } from '@/types/weather';
import { sunny, cloud, rainy, snow } from 'ionicons/icons'; // Icônes météo

// Stocke les données météo
const weather = ref<WeatherData | null>(null);

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
  } catch (error) {
    console.error("Erreur lors du chargement des données météo", error);
  }
});
</script>

<style scoped>
ion-note {
  display: flex;
  align-items: center;
}

ion-icon {
  margin-right: 8px; /* Espace entre l'icône et la température */
}

ion-list {
  padding: 10px;
}

ion-item {
  border-bottom: 1px solid #ddd;
}

ion-label {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
