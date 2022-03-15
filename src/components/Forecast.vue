<template>
  <q-scroll-area class="forecast rounded-borders q-mb-md" :class="[this.bgForecast]">
    <div class="row no-wrap">
      <div v-for="n in 13" :key="n" class="flex flex-center forecast-item q-pa-lg" style="height: 10px">
        <h6 class="text-white"> {{ formatHour(n) }} </h6>
        <h6 class="text-weight-bolder"> {{ Math.round(this.forecastData.list[n].main.temp) }}° </h6>
        <img :src="`${this.url_icon}${getIcon(n)}.png`">
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
  import { date } from "quasar"
  import { inject } from "vue"
  export default {
    inject: ['dataForecast', 'forecastBg'],
    data() {
      return {
        url_icon: 'http://openweathermap.org/img/wn/',
        forecastData: this.dataForecast,
        bgForecast: this.forecastBg,
      }
    },
    methods: {
      formatHour(n) {
        const timeStampForecast = new Date(this.forecastData.list[n].dt_txt)
        const hourFormatted = date.subtractFromDate(timeStampForecast, { hours: 4 })
        const currentHour = hourFormatted.getHours()

        if (currentHour < 10) {
          return `0${currentHour}:00`
        }
        return currentHour + ':00'
      },
      getIcon(n) {
        const weatherNow = this.forecastData.list[n].weather[0].description
        const timeStampForecast = new Date(this.forecastData.list[n].dt_txt)
        const hourFormatted = date.subtractFromDate(timeStampForecast, { hours: 4 })
        const currentHour = hourFormatted.getHours()
        let iconD;
        let iconN;

        switch (weatherNow) {
          case 'céu limpo':
            iconD = '01d'
            iconN = '01n'
            break
          case 'nuvens dispersas':
            iconD = '02d'
            iconN = '02n'
            break
          case 'nublado':
            iconD = '04d'
            iconN = '04n'
            break
          case 'chuva leve':
            iconD = '09d'
            iconN = '09n'
            break
          case 'chuva ':
            iconD = '09d'
            iconN = '09n'
            break
          case 'tempestade':
            iconD = '11d'
            iconN = '11n'
          default:
            iconD = '01d'
            iconN = '01n'
            break
        }

          if (currentHour <= 5 || currentHour >= 18) {
            return iconN
          }
          return iconD
      }
    },
  }
</script>

<style>
  .forecast {
    height: 150px;
    margin-top: 100px;
  }
</style>