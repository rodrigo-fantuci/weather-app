<template>
  <q-scroll-area class="forecast rounded-borders q-mb-xl" :class="[bgForecast]" style="border-radius: 10px;">
    <div class="row no-wrap">
      <div v-for="n in 13" :key="n" class="flex flex-center forecast-item q-pa-lg" style="height: 10px">
        <h6 class="text-white"> {{ formatHour(n - 1) }} </h6>
        <h6 class="text-weight-bolder"> {{ Math.round(this.forecastData.list[n].main.temp) }}° </h6>
        <img :src="`${this.url_icon}${getIcon(n - 1)}.png`">
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
  import { date } from "quasar"

  export default {
    props: {
      forecastData: {
        type: Object,
        required: true,
      },
      bgForecast: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        url_icon: 'http://openweathermap.org/img/wn/',
      }
    },
    methods: {
      formatHour(n) {
        const timeStampForecast = new Date(this.forecastData.list[n].dt_txt)
        const hourFormatted = date.subtractFromDate(timeStampForecast, { hours: 4 }).getHours()

        if (hourFormatted < 10) {
          return `0${hourFormatted}:00`
        }
        return hourFormatted + ':00'
      },
      getIcon(n) {
        const weatherNow = this.forecastData.list[n].weather[0].description
        const currentHour = this.formatHour(n).slice(0, 2)
        let iconD;
        let iconN;

        switch (weatherNow) {
          case 'céu limpo':
            iconD = '01d'
            iconN = '01n'
            break
          case 'nuvens dispersas':
          case 'algumas nuvens':
            iconD = '02d'
            iconN = '02n'
            break
          case 'nublado':
            iconD = '04d'
            iconN = '04n'
            break
          case 'chuva leve':
          case 'chuva moderada':
            iconD = '10d'
            iconN = '10n'
            break
          case 'chuva forte':
            iconD = '09d'
            iconN = '09n'
            break
          case 'tempestade':
            iconD = '11d'
            iconN = '11n'
            break
          default:
            iconD = '02d'
            iconN = '02n'
            break
        }

          if (currentHour <= 6 || currentHour >= 18) {
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
  }
</style>