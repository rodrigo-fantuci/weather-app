<template>
  <q-layout class="flex flex-center" :class="[bgForecast]">
    <q-page class="my-card shadow-20 text-white" :style-fn="this.pageHeight" :class="[bgCard]" style="border-radius: 10px;">

        <Main
          v-if="isRequested"
          :forecastData="this.forecast"
          :currentHour="this.getDate()"
          :iconCard="this.iconCard"
        />

        <Forecast
          v-if="isRequested"
          :forecastData="this.forecast"
          :bgForecast="this.bgForecast"
        />

        <Infos
          v-if="isRequested"
          :forecastData="this.forecast"
          :bgForecast="this.bgForecast"
        />

    </q-page>
  </q-layout>
</template>

<script>
import Main from "./components/Main.vue"
import Forecast from "./components/Forecast.vue"
import Infos from "./components/Infos.vue"
import { date } from "quasar"

export default {
  name: 'App',
  components: {
    Main,
    Forecast,
    Infos
},
  data() {
    return {
      url_base: 'api.openweathermap.org/data/2.5/',
      api_key: '4770661f1131cd5b86437acbf27d2e87',
      isRequested: false,
      currentHour: '',
      forecast: '',
      iconD: '',
      iconN: '',
      bgCard: '',
      bgForecast: '',
      iconCard: '',
    }
  },
    methods: {
    async getData() {
      const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=3464460&units=metric&lang=pt_br&appid=${this.api_key}`)
      const data = await res.json()
      this.forecast = data
      this.isRequested = true

      console.log(this.forecast);
      this.getDate()
      this.getClasses()
    },
    getDate() {
      const timeStamp = Date.now()
      const formattedString = date.formatDate(timeStamp, 'dddd, HH', {
        days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      })
      const formattedHour = date.formatDate(timeStamp, 'HH')

      this.currentHour = formattedHour

      return formattedString + 'h'
    },
    getClasses() {
      const weatherNow = this.forecast.list[0].weather[0].description

      if (this.currentHour <= 6 || this.currentHour >= 18) {
        switch (weatherNow) {
          case 'céu limpo':
              this.bgCard = 'bg-grey-10'
              this.bgForecast = 'bg-grey-9'
              this.iconCard = 'bi bi-sun'
              break
            case 'nuvens dispersas':
            case 'algumas nuvens':
              this.bgCard = 'bg-grey-10'
              this.bgForecast = 'bg-grey-9'
              this.iconCard = 'bi bi-cloud-sun'
              break
            case 'nublado':
              this.bgCard = 'bi bg-grey-10'
              this.bgForecast = 'bi bg-grey-9'
              this.iconCard = 'bi bi-cloud'
              break
            case 'chuva leve':
            case 'chuva moderada':
              this.bgCard = 'bi bg-grey-10'
              this.bgForecast = 'bi bg-grey-9'
              this.iconCard = 'bi bi-cloud-drizzle'
              break
            case 'chuva forte':
              this.bgCard = 'bi bg-grey-10'
              this.bgForecast = 'bi bg-grey-9'
              this.iconCard = 'bi bi-cloud-rain-heavy'
              break
            case 'tempestade':
              this.bgCard = 'bi bg-grey-10'
              this.bgForecast = 'bi bg-grey-9'
              this.iconCard = 'bi bi-cloud-lightning-rain'
              break
            default:
              this.bgCard = 'bg-white'
              this.bgForecast = 'bg-dark'
              this.iconCard = ''
              break
        }
      } else if (this.currentHour > 6 && this.currentHour < 18) {
          switch (weatherNow) {
            case 'céu limpo':
              this.bgCard = 'bg-amber-8'
              this.bgForecast = 'bg-amber-6'
              this.iconCard = 'bi bi-sun'
              break
            case 'nuvens dispersas':
            case 'algumas nuvens':
              this.bgCard = 'bg-amber-8'
              this.bgForecast = 'bg-amber-7'
              this.iconCard = 'bi bi-cloud'
              break
            case 'nublado':
              this.bgCard = 'bi bg-grey-6'
              this.bgForecast = 'bi bg-grey-5'
              this.iconCard = 'bi bi-cloud'
              break
            case ('chuva leve'):
            case ('chuva moderada'):
              this.bgCard = 'bi bg-grey-6'
              this.bgForecast = 'bi bg-grey-5'
              this.iconCard = 'bi bi-cloud-drizzle'
              break
            case 'chuva forte':
              this.bgCard = 'bi bg-grey-6'
              this.bgForecast = 'bi bg-grey-5'
              this.iconCard = 'bi bi-cloud-rain-heavy'
              break
            case 'tempestade':
              this.bgCard = 'bi bg-grey-7'
              this.bgForecast = 'bi bg-grey-6'
              this.iconCard = 'bi bi-cloud-lightning-rain'
              break
            default:
              this.bgCard = 'bg-white'
              this.bgForecast = 'bg-white'
              this.iconCard = ''
              break
        }
      }
    },
    pageHeight() {
      return { minHeight: 0 }
    }
  },
  beforeMount() {
    this.getData()
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.my-card {
  width: 45vw;
}

.iconMain {
  padding: 1rem;
  border-radius: 50%;
  font-size: 11rem;
  margin-top: -40px;
}

.opacity {
  opacity: .8;
}

@media (max-width: 1420px) {
  .my-card {
    width: 70vw;
  }
}

@media (max-width: 860px) {
  .my-card {
    width: 100vw;
    height: 100vh;
  }

  .iconMain {
    font-size: 7rem;
    padding: 1rem;
    right: 20px;
  }

  h4 {
    font-size: 1.5rem;
  }

  .city-name {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
}

</style>