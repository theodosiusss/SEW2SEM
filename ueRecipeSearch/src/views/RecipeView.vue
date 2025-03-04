<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
const apiKey = "523b5f0fc57741f0b2cedcb34a414a18";



const recipeData = ref({});
const props = defineProps({
  id: String
})

onMounted(() =>{
  axios.get(`https://api.spoonacular.com/recipes/${props.id}/information?apiKey=${apiKey}`).then(
      (response) => recipeData.value = response.data
  ).catch(error => {
    console.error("Error fetching recipe data:", error);
  })
})
</script>


<template>
  <div v-if="recipeData">
    <h1>{{ recipeData.title }}</h1>
    <img :src="recipeData.image" :alt="recipeData.title" />
    <p><strong>Zubereitungszeit:</strong> {{ recipeData.readyInMinutes }} Minuten</p>
    <p><strong>Portionen:</strong> {{ recipeData.servings }}</p>
    <p><strong>Gesundheitspunktzahl:</strong> {{ recipeData.healthScore }}</p>
    <p><strong>Quelle:</strong> <a :href="recipeData.sourceUrl" target="_blank">{{ recipeData.sourceName }}</a></p>

    <h2>Zutaten:</h2>
    <ul>
      <li v-for="ingredient in recipeData.extendedIngredients" :key="ingredient.id">
        {{ ingredient.original }}
      </li>
    </ul>

    <h2>Anleitung:</h2>
    <p v-if="recipeData.instructions" v-html="recipeData.instructions"></p>
    <p v-else>Keine Anleitung verfügbar.</p>
  </div>
  <p v-else>Lädt Rezeptdaten...</p>
</template>

<style scoped>
h1 {
  color: #333;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 5px 0;
}
p {
  font-size: 16px;
  color: #555;
}
</style>
