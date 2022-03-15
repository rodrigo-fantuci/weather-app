<template>
  <div class="flex justify-around text-white items-center bg-transparent q-mt-lg" style="height: 50px;">
    <h5 class="text-center"> {{ this.currentHour }}</h5>
  </div>

  <div class="row q-mt-lg">
    <div class="col-6 q-pl-xl">
      <h5> {{this.forecastData.city.name}} </h5>
      <h1 class="q-my-md text-weight-bold">  {{Math.round(this.forecastData.list[0].main.temp)}}° </h1>
      <h6 class="q-mt-lg"> {{capitalizeString(this.forecastData.list[0].weather[0].description)}} </h6>
      <h6>Sensação térmica: {{Math.round(this.forecastData.list[0].main.feels_like)}}°</h6>
    </div>

     <div class="col-6 flex flex-center">
      <h1 :class="[iconCard]" class="iconMain"></h1>
    </div>
  </div>

</template>

<script>
import { inject } from '@vue/runtime-core'
  export default {
    inject: ['dataForecast', 'cardIcon', 'hour'],
    data() {
      return {
        forecastData: this.dataForecast,
        iconCard: this.cardIcon,
        currentHour: this.hour,
      }
    },
    methods: {
      capitalizeString(string) {
        return string[0].toUpperCase() + string.slice(1);
      },
    }
  }
</script>

<style scoped>

</style>