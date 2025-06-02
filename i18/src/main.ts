import { createApp } from 'vue'
import App from './App.vue'
import {createI18n} from "vue-i18n";


const datetimeFormats = {
    'en-US': {
        short: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        },
        long: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        }
    },
    'de-DE': {
        short: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        },
        long: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        }
    }
};

const i18n = createI18n({
    legacy: false,
    locale: "de-DE",
    fallbackLocale: "de-DE",
    datetimeFormats,
    messages:{
        "de-DE": {
            IpInfo: "IP-Informationen",
            IpAdr: "IP-Adresse",
            Country: "Land",
            City: "Stadt",
            Latitude: "Breitengrad",
            Longitude: "Längengrad",
            Timezone: "Zeitzone",
            CurrentTime: "Aktuelle Zeit",
            Sunrise: "Sonnenaufgang",
            Sunset: "Sonnenuntergang",
            Date: "Datum",
            Weather: "Wetter",
            Temperature: "Temperatur",
            WindSpeed: "Windgeschwindigkeit",
            Rain: "Regen",
            errMsgDomain: "Diese Domain existiert nicht!",
            errMsgFetch: "problem beim Fetchen der Daten",
            errMsgFormat: "Ip hat das falsche Format",
            TemperatureValue: "{value} °C",
            SpeedValue: "{value} KM/H",



        },
        "en-US" : {
            IpInfo: "IP Information",
            IpAdr: "IP Address",
            Country: "Country",
            City: "City",
            Latitude: "Latitude",
            Longitude: "Longitude",
            Timezone: "Timezone",
            CurrentTime: "Current Time",
            Sunrise: "Sunrise",
            Sunset: "Sunset",
            Date: "Date",
            Weather: "Weather",
            Temperature: "Temperature",
            WindSpeed: "Wind Speed",
            Rain: "Rain",
            errMsgDomain: "This domain does not exist!",
            errMsgFetch: "an issue occurred while fetching the data",
            errMsgFormat: "Ip has the wrong format",
            TemperatureValue: "{value} °F",
            SpeedValue: "{value} MPH",

        }
    }
})



const app = createApp(App);
app.use(i18n);
app.mount('#app');
