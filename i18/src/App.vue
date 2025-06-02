<script setup lang="ts">

import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {useI18n} from "vue-i18n";

const {t, locale, availableLocales, d } = useI18n();



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
  time: Date,
  timezone: string,
  sunrise: Date,
  sunset: Date,
  weather: WeatherData
}>();

let timeoutId = 0;
watch(textInput, async (value, oldValue) => {
  errorFieldText.value = "";
  clearTimeout(timeoutId);

  loading.value = false;
  if (value.length > 3) {
    if (value.match(domainRegex)) {
      timeoutId = setTimeout(() => getIpFromHostname(value), 500);
    } else {
      errorFieldText.value = t("errMsgFormat");
    }
  }
})


const getIpFromHostname = ((hostname: string) => {
  axios.get(`http://www.dns-lg.com/us01/${hostname}/a`)
      .then(response => getIpAddressInformation(response.data.answer[0].rdata)).then(object => ipInfo.value = object)
      .catch(error => {
            errorFieldText.value = t("errMsgDomain");


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



    return {
      ipAddress: ipAddress,
      country: responseIdApi.data.country,
      city: responseIdApi.data.city,
      latitude: responseIdApi.data.lat,
      longitude: responseIdApi.data.lon,
      time: new Date(),
      timezone: responseIdApi.data.timezone,
      sunrise: new Date(responseWeatherApi.data.daily.sunrise[0]),
      sunset: new Date(responseWeatherApi.data.daily.sunset[0]),
      weather: responseWeatherApi.data.current as WeatherData

    }
  } catch (error) {
    errorFieldText.value= t("errMsgFetch");
    loading.value = false;
  }
}

const formattedTime = computed(() => {
  if (!ipInfo.value) return "";
  const formatter = new Intl.DateTimeFormat(locale.value, {
    timeZone: ipInfo.value.timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(ipInfo.value.time);
});

const formattedSunrise = computed(() => {
  if (!ipInfo.value) return "";
  const formatter = new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(ipInfo.value.sunrise);
});

const formattedSunset = computed(() => {
  if (!ipInfo.value) return "";
  const formatter = new Intl.DateTimeFormat(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(ipInfo.value.sunset);
});



</script>

<template>
  <html>
  <body>
  <div>
    <p>hallo</p>
    <select v-model="locale">
      <option v-for="locale in availableLocales" :value="locale">{{locale}}</option>

    </select>
  </div>
  <input type="text" v-model="textInput">

  <div v-if="errorFieldText" id="errorField">{{ errorFieldText }}</div>

  <div v-if="loading" class="loading-text">

    <h2>{{ t("IpInfo")}}</h2>

    <div v-if="ipInfo">
      <ul>
        <li><strong>{{ t("IpAdr") }}:</strong> {{ ipInfo.ipAddress }}</li>
        <li><strong>{{t("Country")}}</strong> {{ ipInfo.country }}</li>
        <li><strong>{{ t("City") }}</strong> {{ ipInfo.city }}</li>
        <li><strong>{{ t("Latitude") }}</strong> {{ ipInfo.latitude }}</li>
        <li><strong>{{ t("Longitude") }}</strong> {{ ipInfo.longitude }}</li>
        <li><strong>{{ t("Timezone") }}</strong> {{ ipInfo.timezone }}</li>
        <li><strong>{{ t("CurrentTime") }}</strong> {{ formattedTime }}</li>
        <li><strong>{{ t("Sunrise") }}</strong> {{ formattedSunrise }}</li>
        <li><strong>{{ t("Sunset") }}</strong> {{ formattedSunset }}</li>
        <li><strong>{{ t("Date") }}</strong> {{ d(new Date(), 'short') }}</li>
        <li><strong>{{ t("Weather") }}</strong></li>
        <ul>
          <li><strong>{{ t("Temperature") }}:</strong> {{t("TemperatureValue", {value : locale === "en-US" ?  (parseFloat(ipInfo.weather.temperature_2m) * (9/5) + 32).toFixed(2) : ipInfo.weather.temperature_2m}) }}</li>
          <li><strong>{{ t("WindSpeed") }}:</strong> {{t("SpeedValue", {value : locale === "en-US" ?  (parseFloat(ipInfo.weather.wind_speed_10m) / 1.609).toFixed(2) : ipInfo.weather.wind_speed_10m}) }}</li>
          <li><strong>{{ t("Rain") }}:</strong> {{ ipInfo.weather.rain }} mm</li>
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


/* Blinken für Ladeanzeige */
@keyframes blink {
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
