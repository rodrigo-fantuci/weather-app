<template>
  <div class="q-py-md q-px-xl text-white" :class="[bgForecast]" style="border-radius: 10px;">
    <div class="row">
      <div class="col-6">
        <h6 class="opacity">Umidade</h6>
        <h4 class="text-weight-bold"> {{forecastData[0].humidity}}% </h4>
      </div>
      <div class="col-6">
        <h6 class="opacity">Pressão</h6>
        <h4 class="text-weight-bold"> {{forecastData[0].pressure}}hpa </h4>
      </div>
    </div>
    <div class="row q-my-md">
      <div class="col-6">
        <h6 class="opacity">Visibilidade</h6>
        <h4 class="text-weight-bold"> {{(forecastData[0].visibility / 1000)}}km </h4>
      </div>
      <div class="col-6">
        <h6 class=" opacity">Vento</h6>
        <h4 class="text-weight-bold"> {{forecastData[0].wind_speed}} m/s </h4>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-6">
        <h6 class="opacity">Amanhecer</h6>
        <h4 class="text-weight-bold"> {{ getSunHours()[0] }} </h4>
      </div>
      <div class="col-6">
        <h6 class=" opacity">Escurecer</h6>
        <h4 class="text-weight-bold"> {{ getSunHours()[1] }} </h4>
      </div>
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
      bgForecast: {
        type: String,
        required: true,
      }
    },
    methods: {
      getSunHours() {
        const sunrise = new Date(this.forecastData[0].sunrise * 1000)
        const sunset = new Date(this.forecastData[0].sunset * 1000)

        return [sunrise.getHours() + ':' + sunrise.getMinutes(), sunset.getHours() + ':' + sunset.getMinutes()]
      }
    }
  }
</script>

<style scoped>

</style>