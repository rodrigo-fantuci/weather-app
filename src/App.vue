<template>
  <q-layout>
    <q-page class="flex flex-center" :class="[bgForecast]">
      <div class="my-card shadow-20 rounded-borders" :class="[bgCard]">
        <q-page class="text-white" :style-fn="setHeightPage">

        <Main />

        <Forecast />

        <Infos />

        </q-page>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import Main from "./components/Main.vue"
import Forecast from "./components/Forecast.vue"
import Infos from "./components/Infos.vue"
import { date } from "quasar"
import { computed } from "vue"

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
      currentHour: '',
      forecast: '',
      iconD: '',
      iconN: '',
      bgCard: '',
      bgForecast: '',
      iconCard: '',
    }
  },
    provide() {
      return {
        dataForecast: computed(() => this.forecast),
        hour: computed(() => this.getDate()),
        cardIcon: computed(() => this.iconCard),
        forecastBg: computed(() => this.bgForecast)
      }
    },
  methods: {
    async getData() {
      const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=3464460&units=metric&lang=pt_br&appid=${this.api_key}`)
      const data = await res.json()
      this.forecast = data

      console.log(this.forecast);
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

      if (this.currentHour <= 6 && this.currentHour >= 18) {
        switch (weatherNow) {
          case 'céu limpo':
              this.bgCard = 'bg-grey-10'
              this.bgForecast = 'bg-dark'
              this.iconCard = 'bi bi-sun'
              break
            case 'nuvens dispersas':
            case 'algumas nuvens':
              this.bgCard = 'bg-grey-10'
              this.bgForecast = 'bg-grey-9'
              this.iconCard = 'bi bi-cloud'
              break
            case 'nublado':
              this.bgCard = 'bi bg-grey-10'
              this.bgForecast = 'bi bg-grey-9'
              this.iconCard = 'bi bi-cloud'
              break
            case ('chuva leve'):
            case ('chuva moderada'):
              this.bgCard = 'bi bg-grey-106'
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
    capitalizeString(string) {
      return string[0].toUpperCase() + string.slice(1);
    },
    setHeightPage(offset) {
      return {minHeight: 0}
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
  width: 50vw;
}

.iconMain {
  padding: 2rem;
  border-radius: 50%;
  font-size: 10rem;
  position: absolute;
  right: 60px;
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
  }

  .iconMain {
    font-size: 7rem;
    padding: 1rem;
    right: 20px;
  }

  h4 {
    font-size: 1.5rem;
  }
}

</style>