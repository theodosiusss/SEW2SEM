<script setup lang="ts">

import {onMounted, ref, useTemplateRef, watch} from "vue";
import axios from 'axios';

interface WeatherData {
  rain: string,
  temperature_2m: string,
  wind_speed_10m: string
}

const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const errorFieldText = ref("");

const textInput = ref("");
const loading = ref(false)
const ipInfo = ref<{
  ipAddress: string,
  country: string,
  city: string,
  latitude: string,
  longitude: string,
  time: string,
  timezone: string,
  sunrise: string,
  sunset: string,
  weather: WeatherData
}>();

let timeoutId = 0;
watch(textInput, async (value, oldValue) => {
  errorFieldText.value = "";
  clearTimeout(timeoutId);

  loading.value = false;
  if (value.length > 3 ) {
    if (value.match(domainRegex)) {
      timeoutId = setTimeout(() => getIpFromHostname(value), 300);
    }
    else {
      errorFieldText.value = "Diese Domain Existiert nicht";
    }
  }
})


const getIpFromHostname = ((hostname: string) => {
  axios.get(`http://www.dns-lg.com/us01/${hostname}/a`)
      .then(response => getIpAddressInformation(response.data.answer[0].rdata)).then(object => ipInfo.value = object)
      .catch(error => {
            errorFieldText.value = "Diese Domain Existiert nicht";


          }
      );
});


async function getIpAddressInformation(ipAddress: string) {
  loading.value = true;

  try {
    const responseIdApi = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const responseWeatherApi = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${responseIdApi.data.lat}&longitude=${responseIdApi.data.lon}&current=temperature_2m,wind_speed_10m,rain&daily=sunrise,sunset&timezone=auto`);

    // const responseSunsetApi = await axios.get(`https://api.sunrise-sunset.org/json?lat=${responseIdApi.data.lat}&lng=${responseIdApi.data.lon}&date=today&tzid=${responseIdApi.data.timezone}`);
    // const responseTimeApi = await axios.get(`https://timeapi.io/api/time/current/zone?timeZone=${responseIdApi.data.timezone}`);

    const formatter = new Intl.DateTimeFormat('de-DE', {
      timeZone: responseIdApi.data.timezone,
      hour: '2-digit',
      minute: '2-digit',
    });


    return {
      ipAddress: ipAddress,
      country: responseIdApi.data.country,
      city: responseIdApi.data.city,
      latitude: responseIdApi.data.lat,
      longitude: responseIdApi.data.lon,
      time: formatter.format(new Date()),
      timezone: responseIdApi.data.timezone,
      sunrise: new Date(responseWeatherApi.data.daily.sunrise[0]).toLocaleTimeString(),
      sunset: new Date(responseWeatherApi.data.daily.sunset[0]).toLocaleTimeString(),
      weather: responseWeatherApi.data.current as WeatherData

    }
  } catch (error) {
    alert("problem beim Fetchen der Daten")
    loading.value = false;
  }
}

</script>

<template>
  <html>
  <body>
  <input type="text" v-model="textInput">

  <div v-if="errorFieldText" id="errorField">{{errorFieldText}}</div>

  <div v-if="loading" class="loading-text">

    <h2>IP-Informationen</h2>

    <div v-if="ipInfo">
      <ul>
        <li><strong>IP-Adresse:</strong> {{ ipInfo.ipAddress }}</li>
        <li><strong>Land:</strong> {{ ipInfo.country }}</li>
        <li><strong>Stadt:</strong> {{ ipInfo.city }}</li>
        <li><strong>Breitengrad:</strong> {{ ipInfo.latitude }}</li>
        <li><strong>Längengrad:</strong> {{ ipInfo.longitude }}</li>
        <li><strong>Zeitzone:</strong> {{ ipInfo.timezone }}</li>
        <li><strong>Aktuelle Zeit:</strong> {{ ipInfo.time }}</li>
        <li><strong>Sonnenaufgang:</strong> {{ ipInfo.sunrise }}</li>
        <li><strong>Sonnenuntergang:</strong> {{ ipInfo.sunset }}</li>
        <li><strong>Wetter:</strong></li>
        <ul>
          <li><strong>Temperatur:</strong> {{ ipInfo.weather.temperature_2m }}°C</li>
          <li><strong>Windgeschwindigkeit:</strong> {{ ipInfo.weather.wind_speed_10m }} km/h</li>
          <li><strong>Regen:</strong> {{ ipInfo.weather.rain }} mm</li>
        </ul>
      </ul>
    </div>

    <div v-else>
      <p>Lade IP-Informationen...</p>
    </div>
  </div>

  </body>
  </html>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fruktur&display=swap');


html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

body {

  background-color: #000;
  color: #f00;
  font-family: 'Metal Mania', cursive;
  text-shadow: 2px 2px 5px #ff0000;
}

/* Fehlermeldung */
#errorField {
  color: white;
  background: red;
  border: 2px solid darkred;
  padding: 10px;
  font-size: 18px;
  width: 50%;
  text-align: center;
  margin: 10px auto;
}


/* Ladeanzeige */
.loading-text {
  //color: yellow;


}

/* Blinken für Ladeanzeige */
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}


input[type="text"], .ip-info {
  background: #222;
  border: 2px solid #ff0000;
  color: #f00;
  font-family: 'Fruktur', cursive;
  padding: 10px;
  font-size: 20px;
  width: 50%;
  display: block;
  margin: 20px auto;
  text-align: center;
}

h2 {
  font-size: 2em;
  text-transform: uppercase;
  border-bottom: 3px solid #ff0000;
  padding-bottom: 5px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

li {
  padding: 5px 0;
  font-size: 1.2em;
  border-left: 5px solid #ff0000;
  padding-left: 10px;
}

strong {
  color: #ff9900;
}

p {
  font-size: 1.5em;
  font-style: italic;
  text-align: center;
}

/* Animation für den Text */
@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

p, h2, li {
  animation: flicker 1.5s infinite alternate;
}

</style>
