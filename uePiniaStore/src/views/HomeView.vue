<script setup lang="ts">
import {useProductStore} from "@/stores/productStore.ts";
import Product from "@/components/Product.vue";
import router from "@/router";

const productStore = useProductStore();

</script>

<template>

  <button @click="()=> router.push('/productAdd')"> Add New Product</button>

  <div class="productListWrapper">
    <div class="productList" v-for="product in productStore.products">
      <Product :product="product" />
    </div>

  </div>

</template>

<style scoped>

.productList{
  margin: 20px;

}
.productListWrapper{
  display: flex;
  flex-wrap: wrap;
}


</style>