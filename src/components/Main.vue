<template>
  <h5 class="text-center text-white q-mt-lg" style="height: 50px;">{{ currentHour }}</h5>

  <div class="row q-mt-lg">
    <div class="col-6 q-pl-xl">
      <h5 class="city-name"> Dourados - MS </h5>
      <h1 class="q-my-md text-weight-bold"> {{ forecastData[0].temp }}° </h1>
      <h6 class="description q-mt-lg"> {{capitalizeString(forecastData[0].description = 'ceu limpo' ? 'céu limpo' : forecastData[0].description)}} </h6>
      <h6 class="description">Sensação térmica: {{Math.round(forecastData[0].feels_like)}}° </h6>
    </div>

     <div class="col-6 flex flex-center">
      <p :class="[iconCard]" class="iconMain"></p>
    </div>
  </div>


</template>

<script>
  export default {
    props: {
      forecastData: {
        type: Object,
        required: true,
      },
      currentHour: {
        type: String,
        required: true
      },
      iconCard: {
        type: String,
        required: true
      }
    },
    methods: {
      capitalizeString(string) {
        return string[0].toUpperCase() + string.slice(1);
      },
    },
  }
</script>

<style scoped>
</style>