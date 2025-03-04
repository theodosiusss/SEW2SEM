<script setup lang="ts">
import RecipeList from "@/components/RecipeList.vue";
import {ref, watch} from "vue";

const query = ref("")
const sent = ref(false)
let timeoutId = 0;

watch(query,(newValue,odlValue)=>{
  clearTimeout(timeoutId)
  if(newValue != odlValue) {
    timeoutId = setTimeout(() => {
      sent.value = false;
      setTimeout(() => {
        sent.value = true;
      }, 10);}, 1000);
  }
})
/*function onButtonClick(){

  sent.value = false;
  setTimeout(() => {
    sent.value = true;
  }, 10);
}

 */
</script>


<template>
  <div>
<input type="text" v-model="query">
    <!--<button @click="onButtonClick">abschicken</button> -->

  </div>

  <recipe-list v-if="sent" :query="query"></recipe-list>
</template>

<style scoped>

div{
  margin-bottom: 20px;
}

</style>