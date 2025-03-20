<script setup lang="ts">

import {computed, reactive, ref} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {required, email, numeric, sameAs, alpha, minLength} from '@vuelidate/validators'


const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  birthday: '',
  phoneNumber: '',
  password: '',
  passwordRepeat: '',
})

const rules = {
  firstName: {required,alpha},
  lastName: {required,alpha},
  email: {required, email},
  birthday: {
    required,
  },
  phoneNumber: {numeric},
  password: {minLength: minLength(3), required},
  passwordRepeat: {
    sameAs: sameAs(computed(() => state.password)),
    required,
  },
}

const v$ = useVuelidate(rules, state);

function submitForm() {
  v$.value.$validate();
  console.log(v$.value)
  if (v$.value.$error) {
    alert("not correct")
  } else {
    alert("Form Submitted")
  }
}

</script>

<template>
  <div class="form-container">
    <div class="form-card">
      <h2>Registrierung</h2>

      <div class="form-group">
        <label>Vorname</label>
        <input v-model="state.firstName" @blur="v$.firstName.$touch" class="input" />
        <p v-if="v$.firstName.$error" class="error-text">Fehler beim Namen</p>
      </div>

      <div class="form-group">
        <label>Nachname</label>
        <input v-model="state.lastName" @blur="v$.lastName.$touch" class="input" />
        <p v-if="v$.lastName.$error" class="error-text">Fehler beim Nachnamen</p>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="state.email" @blur="v$.email.$touch" class="input" />
        <p v-if="v$.email.$error" class="error-text">Fehler bei <Emai1></Emai1>l</p>
      </div>

      <div class="form-group">
        <label>Geburtstag</label>
        <input type="date" v-model="state.birthday" @blur="v$.birthday.$touch" class="input" />
        <p v-if="v$.birthday.$error" class="error-text">Fehler beim Geburtstag</p>
      </div>

      <div class="form-group">
        <label>Telefon</label>
        <input v-model="state.phoneNumber" @blur="v$.phoneNumber.$touch" class="input" />
        <p v-if="v$.phoneNumber.$error" class="error-text">Fehler bei der Telefonnummer</p>
      </div>

      <div class="form-group">
        <label>Passwort</label>
        <input type="password" v-model="state.password" @blur="v$.password.$touch" class="input" />
        <p v-if="v$.password.$error" class="error-text">Fehler beim Passwort</p>
      </div>

      <div class="form-group">
        <label>Passwort wiederholen</label>
        <input type="password" v-model="state.passwordRepeat" @blur="v$.passwordRepeat.$touch" class="input" />
        <p v-if="v$.passwordRepeat.$error" class="error-text">Fehler bei der Passwortwiederholung</p>
      </div>

      <button :disabled="v$.$invalid" @click="submitForm" class="submit-button">
        Submit
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Container für das gesamte Formular */
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  padding: 20px;
}

/* Stylische Card für das Formular */
.form-card {
  background: lightblue;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-family: "Comic Sans MS";
}

/* Titel des Formulars */
h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Labels für die Eingabefelder */
.form-group label {

  display: block;
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
  color: #444;
  font-family: "Comic Sans MS";
}

/* Inputs */
.input {
  background-color: powderblue;
  width: 100%;
  padding: 10px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;
  font-family: "Comic Sans MS";
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

/* Fehlernachricht */


/* Animation für Fehlermeldungen */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button */
.submit-button {
  width: 100%;
  padding: 12px;
  background: lightskyblue;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.submit-button:hover {
  background: #0056b3;
}

/* Deaktivierter Button */
.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
