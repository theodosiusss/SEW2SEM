<script setup lang="ts">
import router from "@/router";


const props = defineProps({
  id : Number,
  title : String,
  image : String,
})

function goToRecipe(){
  router.push(`/recipes/${props.id}`);
}

</script>
<template>

  <div @click="goToRecipe">
    <img :alt=title :src="image">
    <p>{{title}}</p>
  </div>

</template>

<style scoped>

div:hover{
  cursor: pointer;
  opacity: 0.8
}
div {
  margin-bottom: 10px;
}

</style>