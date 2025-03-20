<script setup lang="ts">

import router from "@/router";
import ProductEdit from "@/components/ProductEdit.vue";





function submittedForm() {

    router.push("/")

}
</script>

<template>
  <ProductEdit @submitted="submittedForm" />
</template>

<style scoped>

</style>