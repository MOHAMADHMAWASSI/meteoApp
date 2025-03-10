<template>
  <span :style="iconStyle">☀️</span>
</template>

<script>
export default {
  props: {
    weatherCode: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: '2em'
    }
  },
  computed: {
    colorMap() {
      return {
        0: 'yellow',    // Clear sky
        1: 'yellow',    // Mainly clear
        2: 'yellow',    // Partly cloudy
        3: 'grey',      // Overcast
        45: 'grey',     // Fog
        48: 'grey',     // Depositing rime fog
        51: 'blue',      // Drizzle: Light intensity
        53: 'blue',      // Drizzle: Moderate intensity
        55: 'blue',      // Drizzle: Dense intensity
        56: 'blue',      // Freezing Drizzle: Light intensity
        57: 'blue',      // Freezing Drizzle: Dense intensity
        61: 'blue',      // Rain: Slight intensity
        63: 'blue',      // Rain: Moderate intensity
        65: 'blue',      // Rain: Heavy intensity
        66: 'blue',      // Freezing Rain: Light intensity
        67: 'blue',      // Freezing Rain: Heavy intensity
        71: 'white',     // Snow fall: Slight intensity
        73: 'white',     // Snow fall: Moderate intensity
        75: 'white',     // Snow fall: Heavy intensity
        77: 'white',     // Snow grains
        80: 'blue',      // Rain showers: Slight intensity
        81: 'blue',      // Rain showers: Moderate intensity
        82: 'blue',      // Rain showers: Violent intensity
        85: 'white',     // Snow showers: Slight intensity
        86: 'white',     // Snow showers: Heavy intensity
        95: 'red',       // Thunderstorm: Slight or moderate
        96: 'red',       // Thunderstorm with slight and heavy hail
        99: 'red'        // Thunderstorm with slight and heavy hail
      };
    },
    iconColor() {
      return this.colorMap[this.weatherCode] || 'black';
    },
    iconStyle() {
      return {
        color: this.iconColor,
        fontSize: this.size
      };
    }
  }
};
</script>
