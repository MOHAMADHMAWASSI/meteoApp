# Guide du développeur pour MeteoApp

MeteoApp est une application météo développée avec Vue.js et Ionic Framework. Elle affiche les conditions météorologiques à l'aide d'icônes et de couleurs intuitives, permettant aux utilisateurs de comprendre la météo en un coup d'œil.

## Structure du projet

- **src/components** : Contient des composants Vue réutilisables tels que « WeatherIcon.vue » et « MyWeatherComponent.vue ».
- **src/views** : Contient des composants de vue pour différentes pages, comme « CurrentWeather.vue », « DailyForecast.vue » et « HourlyForecast.vue ».
- **src/services** : Contient des fichiers de service pour les appels d'API, tels que « WeatherService.ts ».
- **src/types** : Contient les définitions de types TypeScript du projet.
- **src/assets** : Contient les styles et images globaux utilisés dans l'application.

## Composants clés

### WeatherIcon.vue
Le composant « WeatherIcon » affiche une icône météo dont la couleur dépend du code météo. Il accepte deux propriétés :
- « weatherCode » : un nombre représentant les conditions météorologiques.
- « size » : une chaîne représentant la taille de l’icône (la valeur par défaut est « 2 em »).

### CurrentWeather.vue
Le composant « CurrentWeather » affiche les conditions météorologiques actuelles pour une ville sélectionnée. Il utilise le composant « WeatherIcon » pour afficher l’icône météo et inclut des informations météorologiques supplémentaires telles que la température, l’humidité, la vitesse du vent, etc. Il permet également aux utilisateurs de sélectionner une ville dans une liste prédéfinie.

### DailyForecast.vue
Le composant « DailyForecast » affiche les prévisions météo quotidiennes. Il parcourt les données météo quotidiennes et affiche la date, l’icône météo et la plage de températures pour chaque jour. Il inclut une flèche pendant le chargement des données et un message d’erreur si les données ne peuvent pas être récupérées.

### HourlyForecast.vue
Le composant « HourlyForecast » affiche les prévisions météorologiques horaires. Il parcourt les données météorologiques horaires et affiche l'heure, l'icône météo et la température pour chaque heure. Il inclut un indicateur pendant le chargement des données et un message d'erreur si les données ne peuvent pas être récupérées.

## WeatherService
Le composant « WeatherService » est chargé de récupérer les données météorologiques depuis l'API. Il fournit des méthodes pour obtenir les données météorologiques actuelles et les prévisions. Le service gère les appels d'API et la gestion des erreurs.

## Style
L'application utilise des feuilles de style CSS étendues pour les styles spécifiques aux composants. Des styles globaux peuvent être ajoutés dans le répertoire « src/assets ». L'image d'arrière-plan principale de l'application est définie dans « App.vue ».

## Exécution de l'application
Pour exécuter l'application localement, utilisez les commandes suivantes :
```
npm install
npm run serve
```
Cela démarrera le serveur de développement et vous pourrez visualiser l'application dans votre navigateur à l'adresse « http://localhost:8080 ».

## Informations complémentaires

### Icônes
L'application utilise des icônes météo Ionicons. Ces icônes sont importées du package « ionicons/icons » et utilisées dans les composants pour représenter différentes conditions météorologiques.

### Gestion des erreurs
Chaque composant de vue inclut une gestion des erreurs permettant d'afficher un message convivial si les données météorologiques ne peuvent être récupérées. Cela garantit une meilleure expérience utilisateur, même en cas de problème avec l'API.

### Images d'arrière-plan
Les images d'arrière-plan des différentes conditions météorologiques sont définies dynamiquement en fonction du code météo. Cela offre une interface visuellement attrayante qui s'adapte à la météo.

### Date et heure
L'application affiche la date et l'heure actuelles, mises à jour toutes les minutes. Cette gestion est assurée par une combinaison des propriétés réactives de Vue et de la fonction JavaScript « setInterval ».

### Localisation
L'application utilise les paramètres régionaux du navigateur pour afficher les dates et heures au format souhaité par l'utilisateur. Cela garantit une utilisation conviviale pour un public international.
