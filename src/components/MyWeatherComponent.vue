<template>
  <div>
    <WeatherIcon :weather-code="weatherCode" size="3em" />
    </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue';

export default {
  components: {
    WeatherIcon
  },
  props: {
    weatherCode: {
      type: Number,
      required: true
    }
  }
};
</script>
