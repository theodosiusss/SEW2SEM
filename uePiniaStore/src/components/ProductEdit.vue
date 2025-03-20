<script setup lang="ts">
import type {ProductInterface} from "@/components/Product.vue";
import {useProductStore} from "@/stores/productStore.ts";
import {reactive} from "vue";
import {alpha, numeric, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {v4 as uuidv4} from "uuid";
import router from "@/router";


const emit = defineEmits(['submitted'])

const props = defineProps<{ product?: ProductInterface, }>();

const productStore = useProductStore();
let state: { title: string, description: string, price: string, imageURL: string };
if (props.product) {
  state = reactive({
    title: props.product.title,
    description: props.product.description,
    price: "" + props.product.price,
    imageURL: props.product.image,

  })
} else {
  state = reactive({
    title: "",
    description: "",
    price: "",
    imageURL: "",

  })

}

const rules = {
  title: {required},
  description: {required},
  price: {required, numeric},
  imageURL: {required}

}

const v$ = useVuelidate(rules, state);

function submitForm() {

  v$.value.$validate();
  console.log(v$.value)
  if (v$.value.$error) {
    alert("not correct")
  } else {

    if (props.product) {
      productStore.changeProduct(
          props.product.id,
          state.title,
          state.description,
          parseInt(state.price),
          state.imageURL
      )
    } else {
      productStore.addProduct({
        id: uuidv4(),
        title: state.title,
        description: state.description,
        image: state.imageURL,
        price: parseInt(state.price)
      })
    }


    emit("submitted")
  }
}


</script>

<template>

  <div class="form-group">
    <label>Titel</label>
    <input v-model="state.title" @blur="v$.title.$touch" class="input"/>
    <p v-if="v$.title.$error" class="error-text">Fehler beim Titel</p>
  </div>
  <div class="form-group">
    <label>Beschreibung</label>
    <input v-model="state.description" @blur="v$.description.$touch" class="input"/>
    <p v-if="v$.description.$error" class="error-text">Fehler bei der Beschreibung</p>
  </div>
  <div class="form-group">
    <label>Preis</label>
    <input type="number" v-model="state.price" @blur="v$.price.$touch" class="input"/>
    <p v-if="v$.price.$error" class="error-text">Fehler beim Preis</p>
  </div>
  <div class="form-group">
    <label>Bild URL</label>
    <input v-model="state.imageURL" @blur="v$.imageURL.$touch" class="input"/>
    <p v-if="v$.imageURL.$error" class="error-text">Fehler beim BIld</p>
  </div>

  <button :disabled="v$.$invalid" @click="submitForm" class="submit-button">
    Submit
  </button>


</template>

<style scoped>
.error-text {
  color: palevioletred;
  font-size: 14px;
  margin-top: 5px;
  animation: fadeIn 0.3s ease-in-out;
}
</style>