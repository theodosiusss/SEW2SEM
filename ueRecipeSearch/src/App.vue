<script setup lang="ts">
</script>

<template>
  <div id="app">
  <header>
    Rizzypies
    <router-link to="/">Home</router-link>
  </header>



  <RouterView />


  <footer>
    <RouterLink to="/impressum">Impressum</RouterLink>
  </footer>
  </div>
</template>

<style scoped>

</style>
