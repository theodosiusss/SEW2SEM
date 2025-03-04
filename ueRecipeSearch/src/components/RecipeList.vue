<script setup lang="ts">

import Recipe from "@/components/Recipe.vue";

const props = defineProps({
  query : String
    }
)

import axios from "axios";
import {onMounted, ref} from "vue";

const apiKey = "523b5f0fc57741f0b2cedcb34a414a18";

const recipes = ref([] );

onMounted(()=>{
  if(props.query){
    getRecipes(props.query,2);
  }
})


async function getRecipes (query : string,limit : number){
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=3`)

  recipes.value = response.data.results;


}
</script>

<template>
  <recipe v-for="(recipe,index) in recipes" :id="recipe.id" :image="recipe.image" :title="recipe.title" :key="index"> </recipe>

</template>

<style scoped>

</style>