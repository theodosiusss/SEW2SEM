  <script setup lang="ts">
  import {useProductStore} from "@/stores/productStore.ts";
  import {ref} from "vue";
  import ProductEdit from "@/components/ProductEdit.vue";

  const productStore = useProductStore();

  import type {ProductInterface} from "../interfaces/interface.ts";


  const isEdit = ref(false);

  function onEdit(){
    isEdit.value = !isEdit.value;



  }

  defineProps<{ product: ProductInterface }>();

  </script>

  <template>

    <div class="product">
      <img :src="product.image" :alt="product.title" class="product-image">
      <div class="product-content">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.price }}€</p>
      </div>

      <button @click="()=> productStore.deleteProduct(product.id)">delete</button>
      <button @click="onEdit">edit</button>

    </div>


    <div v-if="isEdit" class="modal-overlay">

      <ProductEdit @submitted="onEdit" :product="product" />

    </div>

  </template>

  <style scoped>


  .product-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
  }

  </style>